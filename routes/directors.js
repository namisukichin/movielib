const express = require('express')
const Director = require('../modals/director')
var route = express.Router()

//All Directors
route.get("/", async (req, res) => {
    let searchOptions = {}

    if(req.query.search != null && req.query.search != ''){
        searchOptions.name = new RegExp(req.query.search, 'i')
    }

    try {
        const directors = await Director.find(searchOptions)
        res.render('directors/index', {directors: directors, searchq: req.query.search})
    } catch {
        console.error('error');
    }
})

//Add Director
route.get("/add", (req, res) => {
    res.render('directors/add', {director: new Director()})
})

//New Director
route.post("/", async (req, res) => {
    const director = new Director({
        name: req.body.directorName
    })

    try {
        const newDirector = await director.save()
        res.redirect('/directors')
    } catch {
        res.render('directors/add', {
            director: director,
            errorMessage: 'Error saving Director'
        })
    }

    /*director.save((err, newDirector) => {
        if(err){
            console.log(director);
            res.render('directors/add', {
                director: director,
                errorMessage: 'error creating director'
            });
        } else {
            console.log('success saving director');
            //res.redirect(`/directors/${newDirector.id}`);
            res.redirect(`/directors/`);
        }
    })*/
})


module.exports = route;