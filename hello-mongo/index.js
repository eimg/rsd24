const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost");

const db = client.db("todo");
const tasks = db.collection("tasks");

async function getData() {
    const data = await tasks.find().limit(1).toArray();
    console.log(data);
    process.exit(0);
}

async function insertData(data) {
    const result = await tasks.insertOne(data);
    console.log(result);
    process.exit(0);
}

getData();
// insertData({ subject: 'Test', done: false });