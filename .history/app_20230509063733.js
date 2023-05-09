const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    
    var today = new Date()
    var currentDay = today.getDay()
    var day = ""

    if (today.getDay() === 6 || today.getDay() === 0) {
        day = 
        res.sendFile(__dirname + '/weekend.html')
    } else {
        res.sendFile(__dirname + '/weekday.html')
    }
})

app.listen(3000, () => {
    console.log("Connected to server!")
})