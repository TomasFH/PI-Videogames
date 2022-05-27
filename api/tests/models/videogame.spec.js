const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

xdescribe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  xdescribe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    xdescribe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });
  });

  // xdescribe("addHouse` and `listHouses`", function () {
  //   beforeEach(() => Videogame.sync({ force: true }));
  //   it("Inicialmente devuelve un arreglo de videojuegos vacío", function () {
  //     const awaitPromise = async() => {
  //       const aux = await Videogame.findAll();
  //       expect(aux).to.eql('pepitoperez');
  //     }
  //     awaitPromise();
  //   });

    // it("Agrega un videojuego y la longitud del arreglo con videojuegos aumenta", function () {
    //   const awaitPromise = async() => {
    //     await Videogame.create({ name: 'Sonic Mania' });
    //     const aux = await Videogame.findAll();
    //     expect(aux).to.have.length(1);
    //   };
    // });

    // it("Si ya existe el videojuego, no lo crea y por ende no aumenta el arreglo de VG", function () {
    //   const awaitPromise = async() => {
    //     await Videogame.create({ name: 'Sonic Mania' });
    //     await Videogame.create({ name: 'Sonic Mania' });
    //     await Videogame.create({ name: 'Sonic Mania' });
    //     const aux = await Videogame.findAll();
    //     console.log(aux);
    //     expect(aux).to.have.length(1);
    //   };
    //   awaitPromise();
    // });

    // it("Si ya existe el videojuego, no lo crea y devuelve un error", function () {
    //   const awaitPromise = async() => {
    //     await Videogame.create({ name: 'Sonic Mania' });
    //     await Videogame.create({ name: 'Sonic Mania' })
    //     .catch(error => {
    //       let errorAux = error;
    //       expect(errorAux).to.be(2);
    //     })
    //     const aux = await Videogame.findAll();
    //     expect(aux).to.have.length(1);
    //   };
    //   // awaitPromise();
    // });

    // it("Si la casa ya existe no se agrega a la lista", function () {
    //   Videogame.addHouse("Gryffindor");
    //   expect(Videogame.listHouses()).to.have.length(1);
    //   Videogame.addHouse("Slytherin");
    //   expect(Videogame.listHouses()).to.have.length(2);
    //   Videogame.addHouse("Slytherin");
    //   expect(Videogame.listHouses()).to.have.length(2);
    // });
  // });
});
