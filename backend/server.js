const express = require('express')
const app = express();
const path = require("path");
const knex = require('./knex');
const { cloudinary } = require("./utils/cloudinary");
require("dotenv").config({ path: "../.env.local" });

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

//limit allows bigger file inputs?
app.use(express.urlencoded({extended: true}))
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
      "event.user_id": id
    })
    // console.log(userEvent);
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
    // console.log(newUser)

    const newUse = await knex("user").insert(newUser).returning(["id","first_name","last_name","email","password"]);
    // console.log("data",newUse)
    res.status(200).send(newUse);
  } catch (err) {
    res.status(404).send(err);
  }
})

//DayView.js
app.get("/journal", async (req, res) => {
  try {
    const date = req.get("postDate");
    const userid = req.get("userid");

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

//App.js
app.get("/event-type", async (req, res) => {
  try {
    const userid = req.get("id");

    const data = await knex("event_type")
      .where({
        user_id:userid
      })
      .select("id","event_type","hex_code")
      .orderBy("id");;
    ;
    if(data.length <= 0){
      const newEventTypes = await knex("event_type")
      .insert(
        [
          {event_type:"study", hex_code:"#7dae9b", user_id:userid},
          {event_type:"leisure", hex_code:"#8abfe8", user_id:userid},
          {event_type:"work", hex_code:"#7b78b8", user_id:userid}
        ],
        ["id","event_type","hex_code"]
      );
      return res.status(200).send(newEventTypes);
    };
    return res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
})

app.put("/event-type", async (req, res) => {
  try {
    const userid = req.get("userid");
    const evIdAndHex = req.body.data;
    // console.log(evIdAndHex);
    for (const evHex of evIdAndHex) {
      await knex("event_type")
      .where({
        user_id:userid,
        id:evHex.eventTypeId
      })
      .update({
        hex_code:evHex.hex
      },["id"]);

    }
    const data = await knex("event_type")
      .where({
      user_id:userid
      })
      .select("id","event_type","hex_code")
      .orderBy("id");
      
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
})

//EventEdit
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
      "event.user_id": userid
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
    

    const newEvent = {
      date:clickDate,
      event_content:eventContent,
      user_id:userid,
      event_type_id:eventTypeId
    }

    const event = await knex("event")
      .insert(newEvent)
      .returning(["id","date","event_content","user_id","event_type_id"]);
      // console.log(event)
    const updatedEvents = await knex("event")
      .select("event.*","event_type.event_type")
      .leftJoin("event_type", "event.event_type_id", "event_type.id")
      .where({
        "event.user_id": userid
      })
    const both = {
      "event":event,
      "updateAll":updatedEvents
    }
    // console.log(event) ->  only return new thing

    res.status(200).send(updatedEvents);
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
      "event.user_id": userid
    })
    res.status(200).send(updatedEvents);


  } catch (err) {
    res.status(404).send(err);
  }
})

//DayImage.js
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
      return res.status(200).send(data);
    }
    
    const imgData = await knex("image")
    .where({
      id:data[0]["image_id"]
    })
    .select(["id","secure_url"]);
    // console.log("🌟",imgData);

    res.status(200).send(imgData);

  } catch (error) {
    res.status(404).send(error);
  }
})

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

//order matters?
app.get("/*", (req, res) => {
  // console.log("💜")
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});