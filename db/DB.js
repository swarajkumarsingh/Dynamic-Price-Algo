const mongoose = require("mongoose");
const keys = require("../keys.js");

let isConnected;
const mongoURL =
  "mongodb+srv://admin:admin@cluster0.nfitzrn.mongodb.net/?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
let isDbConnectionRequested = false;

module.exports = connectToDatabase = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  if (isDbConnectionRequested) {
    // Avoids New Connected Requested from Every other file.
    console.log("=> database connection Already requested");
    return Promise.resolve();
  }
  console.log("=> using new database connection");
  isDbConnectionRequested = true;
  return mongoose
    .connect(mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((db) => {
      isConnected = db.connections[0].readyState;
      console.log(`Connected to DB`);
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(`Error connecting DB`, err);
      return process.exit(1);
    });
};
