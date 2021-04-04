const dotenv = require("dotenv");
dotenv.config()
const mongoose = require("mongoose");


process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit();
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB="mongodb+srv://skaDB:2018831024@cluster0.mjyjk.mongodb.net/OtakuHub?retryWrites=true&w=majorityDATABASE_PASSWORD=2018831024"

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"));

const server = app.listen(5000, () => {
  console.log("port started on 5000 ...");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
