//initializing express
const express = require("express");
const port = 8080; //port number
const app = express(); //intialized
const { createLogs } = require("./middlewares"); //custom middleware

const { connectToMongoDB } = require("./connection"); //connection to mongo db
connectToMongoDB("mongodb://127.0.0.1:27017/usersDB"); //connection done

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(createLogs("logs.txt"));


const { userRouter } = require("./routes"); //getting all the routes and crud opperations

app.use("/api/users", userRouter);

//starts the app
app.listen(port, () => {
  console.log("app is running on port " + port);
});
