const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.set
app.get('/', (req, res) => {
    
    var today = new Date()

    if (today.getDay() === 6 || today.getDay() === 0) {
        res.send("It's the weekend!")
    } else {
        res.send("It's the weekday.")
    }
})

app.listen(3000, () => {
    console.log("Connected to server!")
})