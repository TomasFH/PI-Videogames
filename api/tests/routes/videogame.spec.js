/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: "Sonic Mania",
  description: "Sonic Mania es una nueva aventura de Sonic, Tails y Knuckles con Jefes finales únicos, gloriosos escenarios en 2D y el clásico modo de juego de la saga.",
  releaseDate: "2017-8-29",
  rating: "4.3",
  platforms: "PC, Xbox One, Nintendo Switch, PlayStation 4",
  image: "https://generacionxbox.com/wp-content/uploads/2017/08/sonic-mania-wallpaper-generacion-xbox.png"
}

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /api/videogame', () => {
    it('should get 200', () =>
      agent.get('/api/videogame').expect(200)
    );
  });
  describe('POST /api/videogame', () => {
    it('should get 200', () =>
      agent.post('/api/videogame')
      .send({})
      .expect(200)
    );
  });
});
