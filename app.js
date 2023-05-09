const express = require("express");
const bodyParser = require("body-parser");
const port = 3000
const date = require(__dirname + "/date.js")

const app = express();

const items = ['Workout', "Bridal Alterations", "Self-study"]
const workItems = []

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get("/", (req, res) => {

    let day = date.getDate();

  res.render("list", { listTitle: day, newListItem: items });
});

app.post('/', (req, res) => {
    let item = req.body.newItem

    if (req.body.list === 'Work') {
        workItems.push(item)
        res.redirect('/work')
    } else {
        items.push(item)
        res.redirect('/')
    }

})

app.get('/work', (req, res) => {
    res.render('list', {listTitle: 'Work List', newListItem: workItems})
})

app.listen(port, () => {
  console.log("Connected to server!");
});
