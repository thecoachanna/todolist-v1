const express = require("express");
const bodyParser = require("body-parser");
const port = 3000

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  var today = new Date();
  
    var options = {
        weekday: 'long',
        day: 'numeric';
        month:
    }

  res.render("list", { kindOfDay: day });
});

app.listen(port, () => {
  console.log("Connected to server!");
});
