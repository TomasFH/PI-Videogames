import Input from "./Input";
import { Route, Switch, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearMyGames } from "../store1/actions";



export default function NavBar() {

    const dispatch = useDispatch()

    return (
        <div>
            <Link to="/" onClick={() => dispatch(clearMyGames())}>
                <h3>Soy Henry - PI Videogames</h3>
            </Link>

            <Link to="/" onClick={() => dispatch(clearMyGames())}>
                <p>Home</p>
            </Link>

            <Link to="/add-videogame">
                <p>Add Videogame</p>
            </Link>
            
            <Route exact path="/">
                <Input />
            </Route>
        </div>
    )
}