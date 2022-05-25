import Input from "./Input";
import { Route, Switch, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearMyGames, showMyGamesOnly } from "../store1/actions";
import styles from "./NavBar.module.css";


export default function NavBar() {

    const dispatch = useDispatch()

    return (
        <div className={styles.navBar}>
            <Link to="/videogames/" onClick={() => {
                dispatch(clearMyGames());
                dispatch(showMyGamesOnly(false));
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
                dispatch(showMyGamesOnly(false));
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