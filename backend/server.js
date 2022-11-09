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

//assuming that localStorage.getItem(userId) is set to 
app.get('/user-info', async (req, res) => {
  const id = req.get("id");
  const userInfo = await knex("user")
    .where({
      id: id
    })
    .select()
  res.send(userInfo);
})

app.get("/login", async (req, res) => {
  const email = req.get("email");
  const password = req.get("password");
  const userInfo = await knex("user")
    .where({
      email: email,
      password: password
    })
    .select()
  res.send(userInfo);
})

app.post("/signup", async (req, res) => {
  const first = req.get("first");
  const last = req.get("last");
  const email = req.get("email");
  const password = req.get("password");

  const newUser = [
    {
      first_name: first,
      last_name: last,
      email: email,
      password: password
    }
  ];
  console.log(newUser)

  const data = await knex("user").insert(newUser).returning(["id","first_name","last_name","email","password"]);
  // console.log("data",data)
  res.send(data);
})
app.put("/", async (req, res) => {

})
app.delete("/", async (req, res) => {

})

app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});