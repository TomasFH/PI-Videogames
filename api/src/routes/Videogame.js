require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const { Videogame, Genre } = require("../db");
// axios cuando lo instale/necesite
const axios = require('axios');
const { Op } = require('sequelize');


const router = Router();

router.get("/", async (req, res, next) => {

    const {name} = req.query;

    try {
        if(name){
            //si se le pasa un nombre por Query hace una búsqueda en base a ese nombre
    
            try {
                const apiVideogamePromise = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
                const dbVideogamePromise = await Videogame.findAll({
                    where: {
                        name: {
                            [Op.iLike] : '%' + name + '%'
                        }
                    },
                    include: Genre
                })
    
                // console.log('dbVideogamePromise ', dbVideogamePromise)
    
                const filteredApiVideogame = apiVideogamePromise.data.results.map((videogame) => {
                    return {
                        // imagen, nombre, genero, rating
                        name: videogame.name,
                        image: videogame.background_image,
                        genres: videogame.genres,   //llega como arreglo
                        rating: videogame.rating,
                        id: videogame.id
                    }
                })
    
                const filteredDbVideogame = dbVideogamePromise.map((videogame) => {
                    return {
                        name: videogame.dataValues.name,
                        image: videogame.dataValues.image,
                        genres: videogame.dataValues.genres,
                        rating: videogame.dataValues.rating,
                        id: videogame.dataValues.id
                    }
                })
    
                if((filteredApiVideogame.length === 0) && (filteredDbVideogame.length === 0)){
                    // es decir, no se encontró nungún juego cuyo nombre coincida con lo pasado por Query
                    return res.status(404).send({error: "Videogame not found"})
                }
    
                const allVideogames = [ ...filteredApiVideogame, ...filteredDbVideogame]
    
                res.send(allVideogames)
                
            } catch (error) {
                next(error)
            } 
    
        } else{
            //si no se le pasa ningún nombre por Query busca todo
    
            try {
                let promises = [];
                let resultados;
                let aux2 = [];
            
                for (let i = 1; i <= 5; i++) {
                    promises.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`))
                }
            
                await Promise.all(promises).then(values => {
                    // console.log("Me ejecuté 1: ", values[0].data.results, " Fin!");
            
                    // resultados = values[0].data.results
            
                    resultados = values.map(o => {
                        return o.data.results
                    })
            
                }, reason => {
                  console.log("Me rechazé: ", reason)
                });
            
                // console.log("Soy resultados: ", resultados)
            
                if(resultados.length) {
                    console.log("Hay resultados")
                    for (let r = 0; r < resultados.length; r++) {
                        for (let s = 0; s < resultados[r].length; s++) {
                            aux2 = [
                                ...aux2,
                                resultados[r][s]
                            ]
                        }
                    }
                } else {
                    console.log("No hubieron resultados")
                };
                
                // const apiVideogamePromise = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
                const dbVideogamePromise = await Videogame.findAll({
                    include: Genre
                })
        
                const filteredDbVideogame = dbVideogamePromise.map((videogame) => {
                   return {
                       name: videogame.dataValues.name,
                       image: videogame.dataValues.image,
                       genres: videogame.dataValues.genres,
                       rating: videogame.dataValues.rating,
                       id: videogame.dataValues.id,
                   }
                })
        
                const filteredApiVideogame = aux2.map((videogame) => {
                    return {
                        // imagen, nombre, genero, rating
                        name: videogame.name,
                        image: videogame.background_image,
                        genres: videogame.genres,   //llega como arreglo
                        rating: videogame.rating,
                        id: videogame.id,
                    }
                })
        
                const allVideogames = [ ...filteredApiVideogame, ...filteredDbVideogame]
        
                res.send(allVideogames)
            } catch (error) {
                next(error)
            }
    
        }
    } catch (error) {
        next(error);
    };
});

// router.get("/",async (req,res,next) => {

//     let promises = [];
//     let resultados;
//     let aux2 = [];

//     for (let i = 1; i <= 5; i++) {
//         promises.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`))
//     }

//     await Promise.all(promises).then(values => {
//         // console.log("Me ejecuté 1: ", values[0].data.results, " Fin!");

//         // resultados = values[0].data.results

//         resultados = values.map(o => {
//             return o.data.results
//         })

//     }, reason => {
//       console.log("Me rechazé: ", reason)
//     });

//     // console.log(resultados)

//     for (let r = 0; r < resultados.length; r++) {
//         for (let s = 0; s < resultados[r].length; s++) {
//             aux2 = [
//                 ...aux2,
//                 resultados[r][s]
//             ]
//         }
//     }

//     console.log(aux2);

//     res.send(aux2);
// })

router.get("/:videogameId", async (req, res, next) => {

    const { videogameId } = req.params;


    try {

        if(videogameId.length < 8 ){
            //el tamaño de las ID's de la API suelen ser de 6 números. Si supera esa longitud, no pregunta nada a la API.
            const apiVideogamePromise = axios.get(`https://api.rawg.io/api/games/${videogameId}?key=${API_KEY}`)
            apiVideogamePromise.then((response) => {
                const apiVideogame = response;
                // console.log(apiVideogame);
                const filteredApiVideogame = {
                    id: apiVideogame.data.id,
                    name: apiVideogame.data.name,
                    image: apiVideogame.data.background_image,
                    genres: apiVideogame.data.genres,
                    description: apiVideogame.data.description_raw,
                    releaseDate: apiVideogame.data.released,
                    rating: apiVideogame.data.rating,
                    platforms: apiVideogame.data.platforms
                };

                res.send(filteredApiVideogame);
            })
        } else {
            //si es mayor de 8 (por poner un número de longitud mayor que los de la API y menos que los de la DB) busca en la base de datos
            const dbVideogamePromise = await Videogame.findAll({
                include: Genre,
                where: {
                    id: videogameId
                }
            })

            const aux = dbVideogamePromise[0].dataValues; //al filtar por ID, debería tener un único valor en mi arreglo, por eso busco el elemento de la posición 0.
            const filteredDbVideogame = {
                id: aux.id,
                name: aux.name,
                image: aux.image,
                genres: aux.genres,
                description: aux.description,
                releaseDate: aux.releaseDate,
                rating: aux.rating,
                platforms: aux.platforms
            }

            // console.log(aux)
            res.send(filteredDbVideogame)
        }
    } catch (error) {
          next(error);  
    };
});

router.post("/", async (req, res, next) => {
    // nombre, descripción, fecha de lanzamiento, rating 

    try {

        let {name, description, releaseDate, rating, platforms, image } = req.body;
        // let nameLC = name?.toLowerCase(); //LC = Lower Case
    
        // console.log("Se mandó por body name: ", name);
        // console.log("Se mandó por body description: ", description);
        // console.log("Se mandó por body releaseDate: ", releaseDate);
        // console.log("Se mandó por body rating: ", rating);
        
        const newVideogame = await Videogame.create({
            name,
            description,
            releaseDate,
            rating,
            platforms,
            image,
        });
        res.send(newVideogame);
    } catch (error) {
        next(error);
    };

})

router.post(`/link-to-genre/:videogameId/:genreId`, async (req, res, next) => {
    const {videogameId, genreId} = req.params;

    try{
    if(videogameId.length > 8) {
        // si el videojuego viene de la DB
        const videogameDb = await Videogame.findByPk(videogameId);
        // console.log(videogameDb);
        await videogameDb.addGenre(genreId);
        res.status(201).send('Se ha vinculado el videojuego al género indicado.')
    ;} else {
        //si el videojuego viene de la API
        const videogameAPI = await axios.get(`https://api.rawg.io/api/games/${videogameId}?key=${API_KEY}`);
        await videogameAPI.addGenre(genreId);
    }
    } catch(err){
        next(err);
    }
})

router.put("/:idVG", async (req, res, next) => {
    try {
        const {idVG} = req.params;
        const {name} = req.body;
    
        const update = await Videogame.update(
            {name: name},
            {
                where: {
                    id: idVG
                },
            }
        );
    
        // res.send(`Cambié el nombre del juego id ${idVG} a ${name}`)
        res.send(`Se actualizaron ${update} juego/s.`)
    } catch (error) {
        res.send("Falló")
    }
});
router.delete("/:idVG", async (req, res, next) => {
    try {
        const {idVG} = req.params;
    
        const deleted = await Videogame.destroy(
            {
                where: {
                    id: idVG
                },
            }
        );
    
        // res.send(`Cambié el nombre del juego id ${idVG} a ${name}`)
        res.send(`Se eliminó ${deleted} juego/s.`)
    } catch (error) {
        res.send("Falló")
    }
});

module.exports = router;



// para el yo del futuro:

/*
encodeURI( "http://www.foo.com/bar?foo=foo bar jar" )

Will generate: http://www.foo.com/bar?foo=foo%20bar%20jar, i.e., the encoded URI.


decodeURI( "http://www.foo.com/bar?foo=foo%20bar%20jar" )

Will generate: http://www.foo.com/bar?foo=foo bar jar, i.e., the decoded URI.

*/