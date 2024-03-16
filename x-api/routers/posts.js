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

const { auth } = require("../middlewares/auth");

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
			// { $sort: { _id: -1 } },
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
                    // pipeline: [
                    //     {
                    //         $match: {
                    //             from: "users",
                    //             localField: "owner",
                    //             foreignField: "_id",
                    //             as: "owner"
                    //         }
                    //     }
                    // ]
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

	return res.json(likes);
});

module.exports = { postsRouter: router };
