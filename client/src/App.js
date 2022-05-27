import './App.css';
import NavBar from './components/NavBar';
import Videogames from './components/Videogames';
import { Route, Switch } from 'react-router-dom';
import VideogameDetails from './components/VideogameDetails';
import AddVideogame from './components/AddVideogame';
import Order from './components/Order';
import LandingPage from './components/LandingPage';
import VideogameNotFound from './components/VideogameNotFound';

function App() {
  return (
    <div className="App">

    <Route exact path="/">
      <LandingPage />
    </Route>

    <Route path="/videogames">
      <NavBar />
    </Route>

    <Switch>

      <Route exact path="/videogames">
        <VideogameNotFound />
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
