const express = require('express')
const app = express();
const path = require("path");
const knex = require('./knex');
const { cloudinary } = require("./utils/cloudinary");
// const fileUpload = require('express-fileupload');
require("dotenv").config({ path: "../.env.local" });

// app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

//limit allows bigger file inputs?
app.use(express.json({limit:"50mb"}))
const PORT = process.env.PORT || 8080;

//App.js  assuming localStorage item (userId) is set
app.get('/user-info', async (req, res) => {
  try {
    const id = req.get("id");
    const userInfo = await knex("user")
      .where({
        id: id
      })
      .select()
    res.status(200).send(userInfo);
  } catch (err) {
    res.status(404).send(err);
  }
})

//MonthView.js
app.get('/user-event', async (req, res) => {
  try {
    const id = req.get("id");
    const userEvent = await knex("event")
    .select("event.*","event_type.event_type")
    .leftJoin("event_type", "event.event_type_id", "event_type.id")
    .where({
      user_id: id
    })
    res.status(200).send(userEvent);
  } catch (err) {
    res.status(404).send(err);
  }
})

//Longin.js
app.get("/login", async (req, res) => {
  try {
    const email = req.get("email");
    const password = req.get("password");
    const userInfo = await knex("user")
      .where({
        email: email,
        password: password
      })
      .select()
    res.status(200).send(userInfo);
  } catch (err) {
    res.status(404).send(err);
  }
})

//Signup.js
app.post("/signup", async (req, res) => {
  try {
    const first = req.get("first");
    const last = req.get("last");
    const email = req.get("email");
    const password = req.get("password");

    const newUser = {
      first_name: first,
      last_name: last,
      email: email,
      password: password
    };
    console.log(newUser)

    const newUse = await knex("user").insert(newUser).returning(["id","first_name","last_name","email","password"]);
    console.log("data",newUse)
    res.status(200).send(newUse);
  } catch (err) {
    res.status(404).send(err);
  }
})

app.get("/journal", async (req, res) => {
  try {
    const date = req.get("postDate");
    const userid = req.get("userid");
    // console.log(date)

    const journalData = await knex("journal")
      .where({
        date: date,
        user_id: userid
      })
      .select()
    // console.log(journalData)
    res.status(200).send(journalData);
  } catch (err) {
    res.status(404).send(err);
  }
})

app.post("/journal", async (req, res) => {
  try {
    const date = req.get("postDate");
    const content = req.get("content");
    const userid = req.get("userid");
    

    const newJournal = {
      date: date,
      content: content,
      user_id: userid
    };
    const data = await knex("journal").insert(newJournal).returning(["content"]);
    // console.log(data)
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
})
app.put("/journal", async (req, res) => {
  try {
    const date = req.get("postDate");
    const content = req.get("content");
    const userid = req.get("userid");

    const data = await knex("journal")
    .where({
      date: date,
      user_id: userid
    })
    .update({
      content:content
    },["content"]);
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
})

app.get("/event", async (req, res) => {
  try {
    const eventType = await knex("event_type")
      .select()
    // console.log("data",data)
    res.status(200).send(eventType);
  } catch (err) {
    res.status(404).send(err);
  }
})

app.put("/event", async (req, res) => {
  try {
    const id = req.get("id");
    const userid = req.get("userid");
    const eventContent = req.get("eventContent");
    const eventTypeId = req.get("eventTypeId");

    // console.log(id,eventContent,eventTypeId, userid)

    const editEvent = await knex("event")
      .where({
        id:id,
      })
      .update({
        event_content:eventContent,
        event_type_id:eventTypeId
      })
    const updatedEvents = await knex("event")
    .select("event.*","event_type.event_type")
    .leftJoin("event_type", "event.event_type_id", "event_type.id")
    .where({
      user_id: userid
    })

    // console.log(updatedEvents)
    res.status(200).send(updatedEvents);
  } catch (err) {
    res.status(404).send(err);
  }
})

app.post("/event", async (req, res) => {
  try {
    const clickDate = req.get("clickDate");
    const eventContent = req.get("eventContent");
    const userid = req.get("userid");
    const eventTypeId = req.get("eventTypeId");
    // console.log(eventContent)

    const newEvent = {
      date:clickDate,
      event_content:eventContent,
      user_id:userid,
      event_type_id:eventTypeId
    }

    const event = await knex("event")
      .insert(newEvent)
      .returning(["id","date","event_content","user_id","event_type_id"]);
    const updatedEvents = await knex("event")
    .select("event.*","event_type.event_type")
    .leftJoin("event_type", "event.event_type_id", "event_type.id")
    .where({
      user_id: userid
    })
    const both = {
      "event":event,
      "updateAll":updatedEvents
    }
    // console.log(updatedEvents)
      //does this only return new thing??
      //or do I need 
    // const allevents = await knex("event").select();

    // console.log("data",data)
    res.status(200).send(both);
  } catch (err) {
    res.status(404).send(err);
  }
})
app.delete("/event", async (req, res) => {
  try {
    const id = req.get("id");
    const userid = req.get("userid");

    const deleteDone = await knex("event")
      .where("id",id)
      .del()

    const updatedEvents = await knex("event")
    .select("event.*","event_type.event_type")
    .leftJoin("event_type", "event.event_type_id", "event_type.id")
    .where({
      user_id: userid
    })
    res.status(200).send(updatedEvents);


  } catch (err) {
    res.status(404).send(err);
  }
})

//DayImage.js
app.post("/api/img-up", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const day = req.get("day")
    const userid = req.get("userid")

    const uploadRes = await cloudinary.uploader.
    upload(fileStr, {
      upload_preset:"logs"
    })
    
    const newImg = {
      asset_id:uploadRes["asset_id"],
      public_id:uploadRes["public_id"],
      signature:uploadRes["signature"],
      secure_url:uploadRes["secure_url"]
    }
    const uploadImg = await knex("image").insert(newImg).returning(["id","secure_url"]); 

    const data = await knex("journal")
    .where({
      date: day,
      user_id: userid
    })
    .update({
      image_id:uploadImg[0]["id"]
    },);

    res.status(200).send(uploadImg);

  } catch (err) {
    res.status(500).send(err);
  }
})

// app.post("/api/img-del", async (req, res) => {
//   try {
//     const fileStr = req.body.data;
//     const day = req.get("day")
//     const userid = req.get("userid")

//     const uploadRes = await cloudinary.uploader.
//     upload(fileStr, {
//       upload_preset:"logs"
//     })
    
//     const newImg = {
//       asset_id:uploadRes["asset_id"],
//       public_id:uploadRes["public_id"],
//       signature:uploadRes["signature"],
//       secure_url:uploadRes["secure_url"]
//     }
//     const uploadImg = await knex("image").insert(newImg).returning(["id","secure_url"]); 

//     const data = await knex("journal")
//     .where({
//       date: day,
//       user_id: userid
//     })
//     .update({
//       image_id:uploadImg[0]["id"]
//     });
//     // res.status(200).send(JSON.stringify(uploadImg[0]["secure_url"]));
//     res.status(200).send(uploadImg);

//   } catch (err) {
//     res.status(500).send(err);
//   }
// })

app.get("/get-img", async (req, res) => {
  try {
    const day = req.get("day");
    const userid = req.get("userid")

    const data = await knex("journal")
      .where({
        date:day,
        user_id:userid
      })
      .select("image_id");

    if(data.length <= 0){
      return res.status(200).end();
    }

    const imgData = await knex("image")
    .where({
      id:data[0]["image_id"]
    })
    .select(["id","secure_url"]);
    // console.log("💚",imgData);
    if(imgData.length > 0) {
      res.status(200).send(imgData);
    }

  } catch (error) {
    res.status(404).send(error);
  }
})

//order matters?
app.get("/*", (req, res) => {
  console.log("💜")
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});