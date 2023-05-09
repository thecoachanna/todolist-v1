const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    
    var today = new Date()
    var currentDay = today.getDay()
    var day = ""

    if (today.getDay() === 6 || today.getDay() === 0) {
        day = "Weekend"
        res.render('list', )
    } else {
        day = "Weekday"
    }
})

app.listen(3000, () => {
    console.log("Connected to server!")
})