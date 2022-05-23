import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage(){

    return(
        <div className={style.landingPage}>
            <div className={style.container}>  
                <div className={style.message}>
                    <div>
                        <h1>Welcome to my page!</h1>
                    </div>
                    <div>
                        <h3>
                            Search any videogame, filter them by name, rating or genre, or create yours.
                        </h3>
                    </div>
                    <div>
                        <Link to={"/videogames"} >
                            <button className={style.btn}>Discover games!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}