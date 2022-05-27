import Input from "./Input";
import { Route, Switch, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { changeCurrentPage, clear, clearByGenre, clearMyGames, resetOrder, setSelectedInput, showMyGamesOnly } from "../store1/actions";
import styles from "./NavBar.module.css";


export default function NavBar() {

    const dispatch = useDispatch()

    return (
        <div className={styles.navBar}>
            <Link to="/videogames/" onClick={() => {
                dispatch(clearMyGames());
                dispatch(showMyGamesOnly(false));
                dispatch(changeCurrentPage(1));
                dispatch(setSelectedInput(''));
                dispatch(clear());
                dispatch(resetOrder());
                dispatch(clearByGenre());

                if(document.getElementById("genre")){
                    document.getElementById("genre").checked = false
                }

                if(document.getElementById("a-z")){
                    document.getElementById("a-z").checked = false
                }
                if (document.getElementById("order")) {
                    console.log(document.getElementById("order").value);
                    document.getElementById("order").value = "Select an option";
                };
                if (document.getElementById("genreSelect")) {
                    console.log(document.getElementById("genreSelect").value);
                    document.getElementById("genreSelect").value = "Select an option";
                };

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
               dispatch(changeCurrentPage(1));
               dispatch(setSelectedInput(''));
               dispatch(clear());
               dispatch(resetOrder());
               dispatch(clearByGenre());

               if(document.getElementById("genre")){
                   document.getElementById("genre").checked = false
               }

               if(document.getElementById("a-z")){
                   document.getElementById("a-z").checked = false
               }
               if (document.getElementById("order")) {
                   console.log(document.getElementById("order").value);
                   document.getElementById("order").value = "Select an option";
               };
               if (document.getElementById("genreSelect")) {
                   console.log(document.getElementById("genreSelect").value);
                   document.getElementById("genreSelect").value = "Select an option";
               };

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