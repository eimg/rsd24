require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_HOST);
const xdb = mongo.db("x");
const xnotis = xdb.collection("notis");

const { auth } = require("../middlewares/auth");

router.get("/notis", auth, async (req, res) => {
	const user = res.locals.user;
	const notis = await xnotis
		.aggregate([
			{
				$match: {
					owner: new ObjectId(user._id),
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "actor",
					foreignField: "_id",
					as: "actor",
				},
			},
			{
				$unwind: "$actor",
			},
			{
				$sort: { _id: -1 },
			},
		])
		.toArray();

	return res.json(notis);
});

router.put("/notis/:id", async (req, res) => {
	const { id } = req.params;
	const result = await xnotis.updateOne(
		{ _id: new ObjectId(id) },
		{
			$set: { read: true },
		}
	);

	return res.json(result);
});

module.exports = { notisRouter: router };
