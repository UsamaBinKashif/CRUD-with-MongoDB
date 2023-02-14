//initializing mongoose to connect with mongoDB
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectToMongoDB = async (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectToMongoDB };
