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

	const data = await xposts
		.aggregate([
			{
				$match: { type: "post" },
			},
			{
				$match: { _id: new ObjectId(id) },
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
							$unwind: "$owner",
						},
					],
				},
			},
			{ $unwind: "$owner" },
		])
		.toArray();

	return res.json(data[0]);
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
			// { $sort: { _id: -1 } },
			{ $limit: 10 },
		])
		.toArray();

	return res.json(data);
});

router.put("/posts/like/:id", auth, async (req, res) => {
	const { id } = req.params;
	const user = res.locals.user;

	const post = await xposts.findOne({ _id: new ObjectId(id) });
	const likes = [...post.likes, new ObjectId(user._id)];

	await xposts.updateOne({ _id: new ObjectId(id) }, { $set: { likes } });

	// Add notification
	await xnotis.insertOne({
		type: "like",
		actor: new ObjectId(user._id),
		msg: `likes your post`,
		owner: post.owner,
		target: post._id,
		read: false,
		created: new Date(),
	});

    // Get noti count
    let notis = await xnotis
		.find({ owner: new ObjectId(post.owner), read: false })
		.sort({ _id: -1 })
		.toArray();

	notiCount = notis.length || 0;

    // Boradcast noti count
    clients.map(async client => {
		if (client._id === post.owner.toString()) {
			console.log(`broadcast noti count to: ${client._id}`);

			client.send(JSON.stringify({ type: "notis", notiCount }));
		}
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
	await xnotis.insertOne({
		type: "like",
		actor: new ObjectId(user._id),
		msg: `unlike your post`,
		owner: post.owner,
		target: post._id,
		read: false,
		created: new Date(),
	});

	// Get noti count
	let notis = await xnotis
		.find({ owner: new ObjectId(post.owner), read: false })
		.sort({ _id: -1 })
		.toArray();

	notiCount = notis.length || 0;

	// Boradcast noti count
	clients.map(async client => {
		if (client._id === post.owner.toString()) {
			console.log(`broadcast noti count to: ${client._id}`);
			client.send(JSON.stringify({ type: "notis", notiCount }));
		}
	});

	return res.json(likes);
});

module.exports = { postsRouter: router };
