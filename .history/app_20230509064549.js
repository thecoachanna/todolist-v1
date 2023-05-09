const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    
    var today = new Date()
    var currentDay = today.getDay()
    var day = ""

    switc
    }
    res.render('list', {kindOfDay: day})
})

app.listen(3000, () => {
    console.log("Connected to server!")
})