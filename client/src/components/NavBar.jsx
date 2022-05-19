import Input from "./Input";
import { Route, Switch, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearMyGames } from "../store1/actions";



export default function NavBar() {

    const dispatch = useDispatch()

    return (
        <div>
            <Link to="/videogames/" onClick={() => {
                dispatch(clearMyGames());
                if(document.getElementById("myGames")){
                    document.getElementById("myGames").checked = false
                }   // En caso de que 'show my games' estuviera activado, al entrar en la ruta de detalles de dicho juego la 
                    //  única manera de volver al inicio es mediante este 'boton' que redirecciona a "/" pero, al hacerlo,
                    //  el show my games seguía activado y mostrando nuestros juegos. Con estas líneas reseteo la info y el checkbox.
            }}>
                <h3>Soy Henry - PI Videogames</h3>
            </Link>

            <Link to="/videogames/" onClick={() => {
                dispatch(clearMyGames());
                if(document.getElementById("myGames")){
                    document.getElementById("myGames").checked = false
                }   // En caso de que 'show my games' estuviera activado, al entrar en la ruta de detalles de dicho juego la 
                    //  única manera de volver al inicio es mediante este 'boton' que redirecciona a "/" pero, al hacerlo,
                    //  el show my games seguía activado y mostrando nuestros juegos. Con estas líneas reseteo la info y el checkbox.
            }}>
                <p>Home</p>
            </Link>

            <Link to="/videogames/add-videogame">
                <p>Add Videogame</p>
            </Link>
            
            <Route exact path="/videogames/">
                <Input />
            </Route>
        </div>
    )
}