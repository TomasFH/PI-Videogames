require('dotenv').config();
const { API_KEY } = process.env;
const { default: axios } = require('axios');
const { Router } = require('express');
const { Videogame, Genre } = require("../db");
// axios cuando lo instale


const router = Router();

// router.get("/", (req, res, next) => {
//     const apiGenres = axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

//     try {
//         apiGenres.then(response => {
//             // console.log(response.data)
//             let aux = response.data.results.map( e => {
//                 return {
//                     id: e.id,
//                     name: e.name,
//                 }
//             })
//             res.send(aux);
//         })
//     } catch (error) {
//         next(error)
//     }
// })

router.get('/', async (req, res, next) => {
    const newGenre = await Genre.findAll({
        include: Videogame
    })

    res.send(newGenre);
})

module.exports = router;