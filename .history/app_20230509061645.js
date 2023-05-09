const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/', (req, res) => {
    var today = new Date()
})

app.listen(3000, () => {
    console.log("Connected to server!")
})