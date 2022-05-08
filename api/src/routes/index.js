const { Router } = require('express');
const videogameRoute = require('./Videogame');
const genreRoute = require("./Genre");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogame", videogameRoute);

router.use("/genre", genreRoute);

module.exports = router;
