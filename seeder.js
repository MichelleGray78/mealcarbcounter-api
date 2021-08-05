const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//load env ars
dotenv.config({ path: "./config/config.env" });

//Load models
const Food = require("./models/Food");

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//Read JSON files
const foods = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/food.json`, "utf-8")
);

//Import data to DB
const importData = async () => {
  try {
    await Food.create(foods);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await Food.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
