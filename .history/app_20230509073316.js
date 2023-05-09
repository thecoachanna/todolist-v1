const express = require("express");
const bodyParser = require("body-parser");
const port = 3000

const app = express();

const items = []

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  var today = new Date();
  
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    var day = today.toLocaleDateString('en-US', options)

  res.render("list", { kindOfDay: day, newListItem: items });
});

app.post('/', (req, res) => {
    var item = req.body.newItem
    items.push(item)
    res.redirect('/')
})

app.listen(port, () => {
  console.log("Connected to server!");
});
