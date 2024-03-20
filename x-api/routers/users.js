require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_HOST);
const xdb = mongo.db("x");
const xusers = xdb.collection("users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const coverUpload = multer({ dest: "photos/covers/" }); 
const profileUpload = multer({ dest: "photos/profiles/" });

const { auth } = require("../middlewares/auth");

router.post("/users/profile", auth, profileUpload.single("profile"), async (req, res) => {
    const id = res.locals.user._id;
    const { filename } = req.file;

    const result = await xusers.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: { profile: filename }
        },
    );

    return res.json(result);
});

router.post(
	"/users/cover",
	auth,
	coverUpload.single("cover"),
	async (req, res) => {
		const id = res.locals.user._id;
		const { filename } = req.file;

		const result = await xusers.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: { cover: filename },
			}
		);

		return res.json(result);
	}
);

router.get("/verify", auth, (req, res) => {
	return res.json(res.locals.user);
});

router.get("/users", auth, async (req, res) => {
	const data = await xusers
		.find()
		.project({ password: 0 })
		.limit(20)
		.toArray();

	return res.json(data);
});

router.get("/users/likes/:id", async (req, res) => {
	const { id } = req.params;
	const post = await xdb
		.collection("posts")
		.findOne({ _id: new ObjectId(id) });
        
	const users = await xusers
		.find({
			_id: { $in: post.likes },
		})
		.toArray();

	return res.json(users);
});

router.get("/users/:id", async (req, res) => {
	const { id } = req.params;
	const data = await xusers.findOne(
		{ _id: new ObjectId(id) },
		{ projection: { password: 0 } }
	);

	return res.json(data);
});

router.post("/login", async (req, res) => {
	const { handle, password } = req.body;
	if (!handle || !password) {
		return res.status(400).json({
			msg: "handle or password required",
		});
	}

	const user = await xusers.findOne(
		{ handle },
		{
			projection: {
				followers: 0,
				following: 0,
			},
		}
	);

	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			delete user.password;
			const token = jwt.sign(user, process.env.JWT_SECRET);
			return res.json({ token });
		}
	}

	return res.status(401).json({
		msg: "incorrect handle or password",
	});
});

router.post("/users", async (req, res) => {
	const { name, handle, profile, password } = req.body;
	if (!name || !handle || !password) {
		return res.status(400).json({
			msg: "name, handle, password: all required",
		});
	}

	const hash = await bcrypt.hash(password, 10);
	const user = {
		name,
		handle,
		profile,
		password: hash,
		created: new Date(),
		followers: [],
	};

	const result = await xusers.insertOne(user);
	user._id = result.insertedId;

	return res.json(user);
});

router.get("/search/users", async (req, res) => {
	let { q } = req.query;

	try {
		let result = await xusers
			.aggregate([
				{
					$match: {
						name: new RegExp(`.*${q}.*`, "i"),
					},
				},
				{
					$sort: { name: 1 },
				},
				{
					$limit: 5,
				},
			])
			.toArray();

		if (result) {
			return res.json(result);
		}
	} catch (e) {
		return res.status(500).json({ msg: e.message });
	}

	return res.status(404).json({ msg: "user not found" });
});

module.exports = { usersRouter: router };
