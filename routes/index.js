const express = require('express')
var route = express.Router()

route.get("/", (req, res) => {
    res.render('index')
})

module.exports = route;