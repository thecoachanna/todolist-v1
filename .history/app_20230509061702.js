const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/', (req, res) => {
    var today = new Date()

    if (today.getDay() === 6 )
})

app.listen(3000, () => {
    console.log("Connected to server!")
})