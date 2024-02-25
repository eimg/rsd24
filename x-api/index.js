require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { usersRouter } = require("./routers/users");
app.use(usersRouter);

app.listen(process.env.PORT, () => {
    console.log(`X API runnint at ${process.env.PORT}`);
});
