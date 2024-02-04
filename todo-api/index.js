const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost");

const db = client.db("todo");
const tasks = db.collection("tasks");

app.get("/tasks", async (req, res) => {
	const data = await tasks.find().toArray();
	setTimeout(() => {
        return res.json(data);
    }, 3000);
});

app.get("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const _id = new ObjectId(id);

	const data = await tasks.findOne({ _id });
	return res.json(data);
});

app.post("/tasks", async (req, res) => {
	const { subject } = req.body;
	if (!subject) {
		return res.status(400).json({ msg: "subject required" });
	}

	const result = await tasks.insertOne({ subject, done: false });
	const data = await tasks.findOne({ _id: new ObjectId(result.insertedId) });
	return res.json(data);
});

app.delete("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const _id = new ObjectId(id);

	await tasks.deleteOne({ _id });
	return res.sendStatus(204);
});

app.put("/tasks/:id", async (req, res) => {
	const { id } = req.params;

	const { subject } = req.body;
	if (!subject) {
		return res.status(400).json({ msg: "subject required" });
	}

	try {
        const _id = new ObjectId(id);
		const result = await tasks.updateOne(
			{ _id },
			{
				$set: { subject },
			}
		);
		const data = await tasks.findOne({ _id });

		return res.json(data);
	} catch (e) {
		res.status(500).json({ msg: e.message });
	}
});

app.put("/tasks/toggle/:id", async (req, res) => {
	const { id } = req.params;
	const _id = new ObjectId(id);

	const current = await tasks.findOne({ _id });
	const done = !current.done;

	const result = await tasks.updateOne(
		{ _id },
		{
			$set: { done },
		}
	);

	const data = await tasks.findOne({ _id });

	return res.json(data);
});

app.delete('/tasks', async (req, res) => {
    const result = await tasks.deleteMany({ done: true });
    return res.sendStatus(204);
});

app.listen(8888, () => {
	console.log("Todo API running at 8888");
});
