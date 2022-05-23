import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./VideogameDetails.module.css";

export default function VideogameDetails() {

    let {videogameId} = useParams();

    // console.log(videogameId);

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState([]);


    useEffect(() => {

        axios.get(`http://localhost:3001/api/videogame/${videogameId}`)
        .then(r => {
            const response = r.data
            // console.log(response);
            setDetails(response);
            console.log("Voy a cambiar el loading a false")
            setLoading(false);
        })

    }, [])

    let availableOn;
    let genreList;

    if(!loading){
        console.log("Ya terminé de cargar. Acá los detalles: ", details);
        if(typeof details.platforms !== 'string'){
            // console.log("Platform = Array de Objetos");
            availableOn = details.platforms.map((p, i) => {
                if(details.platforms.length !== 0 && i === details.platforms.length - 1){
                    // console.log(`Soy ${p.platform.name}, posición ${i}, y soy el último elemento`)
                    return p.platform.name + "."
                } else if (details.platforms.length !== 0){
                    // console.log(`Soy ${p.platform.name}, posición ${i}, y NO soy el último elemento`)
                    return p.platform.name + ", "
                }
            });
        } else {
            // console.log("Platform = String")
            availableOn = details.platforms;
        }

        genreList = details.genres.map((g, i) => {
            if(details.genres.length !== 0 && i === details.genres.length - 1){
                return g.name + "."
            } else if (details.genres.length !== 0) {
                return g.name + ", "
            }
        })

    }

    if(loading){
        return <div>
            <h1>Loading ...</h1>
        </div>
    }

    return (<div className={styles.details}>

        <h1> {details.name}</h1>

        <img src={details.image} alt="not found" />

        <p><b>Description:</b> {details.description}</p>

        <p><b>Genre:</b> {genreList}</p>

        <p><b>Release date:</b> {details.releaseDate}</p>

        <p><b>Rating:</b> {details.rating}</p>

        <p><b>Available on:</b> {availableOn}</p>

    </div>)
}