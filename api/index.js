//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const { API_KEY } = process.env;
const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Genre } = require("./src/db.js");


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {

  async function createGenreList(){
    axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(response => {
      let aux = response.data.results
      // console.log("Soy AUX: ", aux);
      
      aux.map(async(e) => {
        try {
          await Genre.create({
            name: e.name
          })
        } catch (error) {
          // console.log('Ya existe')
        }
      })
    })
    .catch(error => {
      console.log(error);
    });
  };

  createGenreList();

  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
