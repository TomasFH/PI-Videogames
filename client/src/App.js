import './App.css';
import NavBar from './components/NavBar';
import Videogames from './components/Videogames';
import { Route, Switch } from 'react-router-dom';
import VideogameDetails from './components/VideogameDetails';
import AddVideogame from './components/AddVideogame';
import Order from './components/Order';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">

    <Route path="/videogames">
      <NavBar />
    </Route>

    <Route exact path={"/welcome"}>
      <LandingPage />
    </Route>

    <Switch>

      <Route exact path="/videogames">
        <Order />
        <Videogames />
      </Route>

      <Route path="/videogames/details/:videogameId">
        <VideogameDetails />
      </Route>

      <Route path="/videogames/add-videogame">
        <AddVideogame />
      </Route>

    </Switch>

    </div>
  );
}

export default App;
