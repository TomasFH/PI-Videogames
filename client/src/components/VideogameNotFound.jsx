import { useSelector, } from "react-redux";
import style from "./VideogameNotFound.module.css";

export default function VideogameNotFound() {

    let videogameNotFound = useSelector(state => state.videogameNotFound);

    if(videogameNotFound.length){
        return(
            <div className={style.notFoundContainer}>
                <div className={style.videogameNotFoundMSG}>
                    Couldn't find any videogame with that name.
                </div>
            </div>
        )
    } else return null;
};