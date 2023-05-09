const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/', (req, res) => {
    var today = new Date()

    if (today.getDay() === 6 || today.getDay() === 0) {
        res.send("")
    }
})

app.listen(3000, () => {
    console.log("Connected to server!")
})