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

router.get("/posts", async (req, res) => {
    const data = await xposts.aggregate([
        {
            $match: { type: "post" }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "origin",
                as: "comments",
            }
        },
        { $unwind: "$owner" },
        // { $sort: { _id: -1 } },
        { $limit: 10 }
    ]).toArray();

    return res.json(data);
});

module.exports = { postsRouter: router };
