const port = process.env.PORT || 3000;
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/todolistDB'
import dotenv from 'dotenv'
dotenv.config()
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Database Connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

// Mongoose Schemas
const itemsSchema = Schema({ name: String });
const listSchema = Schema({ name: String, items: [itemsSchema] });

// Mongoose Models
const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

// Mongoose Document - Default Items
const item1 = new Item({ name: "Welcome to your to do list!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to delete an item." });

const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  Item.find({})
    .then((foundItems) => {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Successfully saved default items to DB");
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.render("list", { listTitle: "Today", newListItems: foundItems });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName })
    .then((foundList) => {
      if (!foundList) {
        // create new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect(`/${customListName}`);
      } else {
        // show existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post route for new to do
app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({ name: itemName });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
      .then((foundItems) => {
        foundItems.items.push(item);
        foundItems.save();
        res.redirect(`/${listName}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// Delete route for to do's
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName == "Today") {
    deleteCheckedItem();
  } else {
    deleteCustomItem();
  }

  async function deleteCheckedItem() {
    await Item.deleteOne({ _id: checkedItemId });
    res.redirect("/");
  }

  async function deleteCustomItem() {
    await List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }
    );
    res.redirect(`/${listName}`);
  }
});

app.listen(port, () => {
  console.log("Connected to server!");
});
