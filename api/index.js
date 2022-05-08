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
const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Genre } = require("./src/db.js")

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {

  async function createGenreList(){
    const aux = (await axios.get(`http://localhost:3001/api/genre`)).data

    // console.log('Soy aux en db: ', aux);

      aux.map(async(e) => {
        try {
          await Genre.create({
            name: e.name
          })
        } catch (error) {
          // console.log('Ya existe')
        }
      })
  }

  createGenreList();

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
