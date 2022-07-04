require('dotenv').config();
const { API_KEY } = process.env;
const { default: axios } = require('axios');
const { Router } = require('express');
const { Videogame, Genre } = require("../db");
// axios cuando lo instale


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const newGenre = await Genre.findAll({
            include: Videogame
        })
        res.send(newGenre);
    } catch (error) {
        next(error);
    };

});

router.post("/", (req, res, next) => {

    const { genre } = req.body;

    Genre.create({genre})
    .then(r => {
        res.send("Se ha agregado el género " + r);
    })
    .catch(error => {
        next(error);
    });
});

module.exports = router;