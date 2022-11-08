const express = require('express')
const app = express();
// const knex = require("./knex");
const path = require("path");
const knex = require('./knex');
require("dotenv").config({ path: "../.env.local" });
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
const PORT = process.env.PORT || 8080;

// app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get('/', (req, res) => {
  res.send('Hello World');
})
app.get("/api", async (req, res) => {
  const userInfo = await knex
    .select({
      firstName:"first_name"
    })
    .from("user");
  res.send(userInfo);
})

app.listen(PORT, () => {
	console.log("App listening on port" + PORT);
});