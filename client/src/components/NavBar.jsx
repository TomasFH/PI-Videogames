import Input from "./Input";
import { Route, Switch, Link } from 'react-router-dom';


export default function NavBar() {
    return (
        <div>
            <Link to="/">
                <h3>Soy Henry - PI Videogames</h3>
            </Link>

            <Link to="/">
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