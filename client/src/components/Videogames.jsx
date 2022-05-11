import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../store1/actions";
import Videogame from "./Videogame";

export default function Videogames(){

    let videogames = useSelector(state => state.videogames);
    let searchedVideogames = useSelector(state => state.searchedVideogames);
    let orderedVideogames = useSelector(state => state.orderedVideogames);
    let showMyGames = useSelector(state => state.showMyGames)

    const dispatch = useDispatch();

    // useEffect(() => {

    // }, [])

    // console.log("Soy videogames: ", videogames);

    // console.log("Soy searchedVideogames: ", searchedVideogames);


    return <div>
        <button onClick={() => dispatch(getVideogames())}>Traer videojuegos</button>
        
        {
            (showMyGames.length)? showMyGames.map(v => {
                return (
                    <Videogame name={v.name} image={v.image} genres={v.genres} key={v.id} />
                )
            }) : 
            (orderedVideogames.length)? orderedVideogames.map(v => {
                return (
                    <Videogame name={v.name} image={v.image} genres={v.genres} key={v.id} />
                )
            }) : 
            (searchedVideogames.length)? searchedVideogames.map(v => {
                return (
                    <Videogame name={v.name} image={v.image} genres={v.genres} key={v.id} />
                )
            }) : 
            videogames.map(v => {
                return (
                    <Videogame name={v.name} image={v.image} genres={v.genres} key={v.id} />
                )
            }) 
            

            /* Si hay algo en searchedVideogames ( o sea, si se realizó una búsqueda ) muestra solo ese/esos videojuego/s. 
            Sino, mostrará todos los videojuegos */

        }
    </div>
}