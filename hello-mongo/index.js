const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost");

const x = client.db("x");

async function getData() {
	const data = await x.collection("posts")
		.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "owner",
					foreignField: "_id",
					as: "owner_user",
				},
			},
			{ $limit: 1, },
		]).toArray();

	console.log(data[0].owner_user);
	process.exit(0);
}

getData();
