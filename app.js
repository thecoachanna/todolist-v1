const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
// const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");
const { Schema } = mongoose;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

// Mongoose Schema
const itemSchema = Schema({
  name: String,
});

// Mongoose Model
const Item = mongoose.model("Item", itemSchema);

// Mongoose Document
const item1 = new Item({
  name: "Workout",
});

const item2 = new Item({
  name: "Self-study",
});

const item3 = new Item({
  name: "TCM",
});

const defaultItems = [item1, item2, item3];
const workItems = [];

app.get("/", (req, res) => {
  // const day = date.getDate();

  Item.find({}).then(function (foundItems) {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems).then(function () {
            console.log("Successfully saved default items to DB");
          }).catch(function (err) {
            console.log(err);
          });
          res.redirect('/')
      } else {
        res.render("list", { listTitle: "Today", newListItem: foundItems });
      }
    }).catch(function (err) {
      console.log(err);
    });
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });
    
    item.save()
    
    res.redirect('/')

});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.listen(port, () => {
  console.log("Connected to server!");
});
