const express = require("express");
const app = express();

require("express-ws")(app);

app.get("/", (req, res) => {
    res.json({ msg: "Chat Server" });
});

const clients = [];

app.ws("/chat", (ws, req) => {
    clients.push(ws);

    ws.on("message", msg => {
        clients.map(client => {
            client.send(msg);
        })
    });
});

app.listen("8080", () => {
    console.log("Chat server running at 8080");
});