import { Link } from "react-router-dom";

export default function LandingPage(){

    return(
        <div>
            <div>
                <h1>Welcome to my page!</h1>
            </div>
            <div>
                <Link to={"/videogames"} >
                    <button>Discover games!</button>
                </Link>
            </div>
        </div>
    )
}