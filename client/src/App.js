import './App.css';
import Contador from './components/contador';
import NavBar from './components/NavBar';
import Videogames from './components/Videogames';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <Contador /> */}
      <Videogames />
    </div>
  );
}

export default App;
