const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.gey('/', (req, res) => {
    res.send('Hello')
})

app.listen(3000, function () {
    console.log("Connected to server!")
})