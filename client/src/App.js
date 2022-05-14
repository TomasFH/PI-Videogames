import './App.css';
import NavBar from './components/NavBar';
import Videogames from './components/Videogames';
import { Route, Switch } from 'react-router-dom';
import VideogameDetails from './components/VideogameDetails';
import AddVideogame from './components/AddVideogame';
import Order from './components/Order';

function App() {
  return (
    <div className="App">

    <Route path="/">
      <NavBar />
    </Route>

    <Switch>

      <Route exact path="/">
        <Order />
        <Videogames />
      </Route>

      <Route path="/details/:videogameId">
        <VideogameDetails />
      </Route>

      <Route path="/add-videogame">
        <AddVideogame />
      </Route>

    </Switch>

    </div>
  );
}

export default App;
