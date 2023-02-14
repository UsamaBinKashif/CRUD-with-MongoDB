//initializing express
const express = require("express");
const port = 8080; //port number
const app = express();
//initializing mongoose to connect with mongoDB
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/usersDB")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
//fs module from node js
const fs = require("fs");
//os module from node js
const os = require("os");

app.use(express.urlencoded({ extended: false })); //middleware

//custom middleware
/* this is my custom middleware which will create a log file 
whenever a request is made*/
app.use((req, res, next) => {
  const log = ` 
    date: ${new Date()},
    osType: ${os.type()},
    url: ${req.url},
    method:${req.method}
    
  `;
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  fs.appendFile("logs.txt", log, (err, data) => {
    if (err) {
      return res.json({ status: "error", message: err.message });
    } else {
      next();
    }
  });
});

//getting users schema
const schema = require("./schema/schema");
const USER = mongoose.model("user", schema);

//crud operations

/*
Task:1
GET Request to get all the users
*/
app.get("/api/users", async (req, res) => {
  const users = await USER.find({});
  if (!users) {
    return res.status(404).json({ msg: "users not found" });
  }
  res.json(users);
});


/*
  Task:2
  Generate HTML DOC
  */
app.get("/users", async (req, res) => {
  const users = await USER.find({});
  const html = `
    <ul>
    ${users
      .map((user) => `<h2>${user.first_name} ${user.last_name}</h2>`)
      .join("")}
    </ul>
    `;

  res.send(html);
});

/*
  Task:3
  get the user of given ID for suppose ID:1
  */
app.get("/api/users/:id", async (req, res) => {
  const user = await USER.findById(req.params.id);
  if (!user)
    return res.status(404).json({ status: "error", message: "User not found" });
  res.send(user);
});

/*
  Task:4
  create a new user
  */
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (!body) {
    return res
      .status(404)
      .json({ msg: "Please chech all the fields are filled" });
  }

  const result = await USER.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log(result);

  return res.status(201).json({
    msg: "created a user",
    data: result,
  });
});

/*
  Task:5
  edit the existing user also learned about status codes here
  */
app.patch("/api/users/:id", async (req, res) => {
  const body = req.body;
  const user = await USER.findByIdAndUpdate(req.params.id, {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  return res.json({ msg: "success" });
});

/*
  Task:6
  delete the user
  */
app.delete("/api/users/:id", async (req, res) => {
  const user = await USER.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  return res.status(200).json({ status: "deleted" });
});



//starts the app
app.listen(port, () => {
  console.log("app is running on port " + port);
});
