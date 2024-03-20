require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_HOST);
const xdb = mongo.db("x");
const xposts = xdb.collection("posts");
const xnotis = xdb.collection("notis");

const { auth } = require("../middlewares/auth");

const clients = [];

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

router.ws("/subscribe", (ws, req) => {
	ws.on("message", token => {
		console.log("message received");
		jwt.verify(token, secret, (err, user) => {
			if (err) return false;

			if (!clients.find(client => client._id === user._id)) {
				ws._id = user._id;
				clients.push(ws);
				console.log("added a new client");
			}
		});
	});
});

router.get("/posts", async (req, res) => {
	const data = await xposts
		.aggregate([
			{
				$match: { type: "post" },
			},
			{
				$lookup: {
					from: "users",
					localField: "owner",
					foreignField: "_id",
					as: "owner",
				},
			},
			{
				$lookup: {
					from: "posts",
					localField: "_id",
					foreignField: "origin",
					as: "comments",
				},
			},
			{ $unwind: "$owner" },
			{ $sort: { _id: -1 } },
			{ $limit: 10 },
		])
		.toArray();

	return res.json(data);
});

router.get("/posts/:id", async (req, res) => {
	const { id } = req.params;
	const post = await getPost(id);
	if (post) {
		res.json(post);
	} else {
		res.sendStatus(500);
	}
});

router.get("/posts/profile/:id", async (req, res) => {
	const { id } = req.params;

	const data = await xposts
		.aggregate([
			{
				$match: { type: "post" },
			},
			{
				$match: { owner: new ObjectId(id) },
			},
			{
				$lookup: {
					from: "users",
					localField: "owner",
					foreignField: "_id",
					as: "owner",
				},
			},
			{
				$lookup: {
					from: "posts",
					localField: "_id",
					foreignField: "origin",
					as: "comments",
				},
			},
			{ $unwind: "$owner" },
			{ $sort: { _id: -1 } },
			{ $limit: 10 },
		])
		.toArray();

	return res.json(data);
});

router.post("/posts", auth, async function (req, res) {
	const { user } = res.locals;
	const { body } = req.body;

	const post = {
		type: "post",
		body,
		owner: new ObjectId(user._id),
		created: new Date(),
		likes: [],
	};

	const result = await xposts.insertOne(post);
	const resultPost = await getPost(result.insertedId);

	console.log("Broadcasting to all client: new post");
	clients.map(client => {
		client.send(JSON.stringify({ type: "posts", post: resultPost }));
	});

	return res.status(201).json(resultPost);
});

router.post("/posts/:origin/comment", auth, async function (req, res) {
	const { user } = res.locals;
	const { body } = req.body;
	const { origin } = req.params;

	const comment = {
		type: "comment",
		origin: new ObjectId(origin),
		body,
		owner: new ObjectId(user._id),
		created: new Date(),
		likes: [],
	};

	const result = await xposts.insertOne(comment);

    const post = await xposts.findOne({ _id: new ObjectId(origin) });
    addNoti({
		type: "comment",
		actor: new ObjectId(user._id),
		owner: post.owner,
		target: post._id,
	});

	return res.status(201).json({ _id: result.insertedId, ...comment });
});

router.put("/posts/like/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	const post = await xposts.findOne({ _id: new ObjectId(id) });
	const likes = [...post.likes, new ObjectId(user._id)];

	await xposts.updateOne({ _id: new ObjectId(id) }, { $set: { likes } });

	// Add notification
    addNoti({
        type: "like",
        actor: new ObjectId(user._id),
        owner: post.owner,
        target: post._id,
    });

	return res.json(likes);
});

router.put("/posts/unlike/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	const post = await xposts.findOne({ _id: new ObjectId(id) });
	const likes = post.likes.filter(
		like => like.toString() !== user._id.toString()
	);

	await xposts.updateOne({ _id: new ObjectId(id) }, { $set: { likes } });

	// Add notification
	addNoti({
		type: "unlike",
		actor: new ObjectId(user._id),
		owner: post.owner,
		target: post._id,
	});

	return res.json(likes);
});

router.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;

    // TODO: Auth check required
    const result = await xposts.deleteOne({ _id: new ObjectId(id) });
    return res.json(result);
});

async function getPost(id) {
	try {
		const data = await xposts
			.aggregate([
				{
					$match: { _id: new ObjectId(id) },
				},
				{
					$lookup: {
						localField: "owner",
						from: "users",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "likes",
						foreignField: "_id",
						as: "liked_users",
					},
				},
				{
					$lookup: {
						localField: "_id",
						from: "posts",
						foreignField: "origin",
						as: "comments",
						pipeline: [
							{
								$lookup: {
									from: "users",
									localField: "owner",
									foreignField: "_id",
									as: "owner",
								},
							},
							{
								$lookup: {
									localField: "_id",
									from: "posts",
									foreignField: "origin",
									as: "comments",
								},
							},
							{
								$unwind: "$owner",
							},
						],
					},
				},
				{
					$unwind: "$owner",
				},
			])
			.toArray();

		return data[0];
	} catch (err) {
		return false;
	}
}

async function addNoti({ type, actor, owner, target }) {
	// Add notification
	await xnotis.insertOne({
		type,
		actor: actor,
		msg: `${type}s your post`,
		owner: owner,
		target: target,
		read: false,
		created: new Date(),
	});

	// Get noti count
	let notis = await xnotis
		.find({ owner, read: false })
		.sort({ _id: -1 })
		.toArray();

	notiCount = notis.length || 0;

	// Boradcast noti count
	clients.map(async client => {
		if (client._id === owner.toString()) {
			console.log(`broadcast noti count to: ${client._id}`);

			client.send(JSON.stringify({ type: "notis", notiCount }));
		}
	});
}

module.exports = { postsRouter: router };
