const express = require('express')
const app = express();
const path = require("path");
const knex = require('./knex');
require("dotenv").config({ path: "../.env.local" });
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
const PORT = process.env.PORT || 8080;

// app.get('/', (req, res) => {
//   res.send('Hello World');
// })
app.get("/testconnection", async (req, res) => {
  const userInfo = await knex
    .select({
      firstName:"first_name"
    })
    .from("user");
  res.send(userInfo);
})

app.get('/user-info', (req, res) => {
  res.send('Hello World');
})

app.post("/", async (req, res) => {
  
})
app.put("/", async (req, res) => {

})
app.delete("/", async (req, res) => {

})

app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});