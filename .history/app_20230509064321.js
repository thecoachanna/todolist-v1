const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    
    var today = new Date()
    var currentDay = today.getDay()
    var day = ""

    if (currentDay === 6 || currentDay === 0) {
        day = "Weekend"
    } else {
        day = "Weekday"
    }
    res.render('list', {kindOfDay: day})
})

app.listen(3000, () => {
    console.log("Connected to server!")
})