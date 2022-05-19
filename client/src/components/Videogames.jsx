import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../store1/actions";
import NotFound from "./NotFound";
import Pagination from "./Pagination";
import Videogame from "./Videogame";

export default function Videogames(){

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(10);

    let videogames = useSelector(state => state.videogames);
    let searchedVideogames = useSelector(state => state.searchedVideogames);
    let orderedVideogames = useSelector(state => state.orderedVideogames);
    let showMyGames = useSelector(state => state.showMyGames);
    let filteredByGenre = useSelector(state => state.filteredByGenre);
    let filteredByGenreNotFound = useSelector(state => state.filteredByGenreNotFound);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [])

    // console.log("Soy videogames: ", videogames);
    
    // console.log("Soy searchedVideogames: ", searchedVideogames);
    
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogame = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const currentVideogameSearched = searchedVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const currentVideogameOrdered = orderedVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const currentVideogameFilteredByGenre = filteredByGenre.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const currentMyVideogames = showMyGames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    //Change page
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }

    console.log("Soy currentVideogames: ", currentVideogame);
    console.log("Soy currentVideogamesSearched: ", currentVideogameSearched);

    if(!(videogames.length)){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    return <div>
        {/* <button onClick={() => dispatch(getVideogames())}>Traer videojuegos</button> */}
        
        {
            (showMyGames.length)? currentMyVideogames.map(v => {
                return (<div key={v.id}>
                    <Videogame name={v.name} image={v.image} genres={v.genres} id={v.id} key={v.id} />
                </div>
                )
            }) : 
            (filteredByGenreNotFound)? <NotFound /> :
            (filteredByGenre.length)? currentVideogameFilteredByGenre.map(v => {
                return (<div key={v.id}>
                    <Videogame name={v.name} image={v.image} genres={v.genres} id={v.id} key={v.id} />
                </div>
                )
            }) :
            (orderedVideogames.length)? currentVideogameOrdered.map(v => {
                return (<div key={v.id}>
                    <Videogame name={v.name} image={v.image} genres={v.genres} id={v.id} key={v.id} />
                </div>
                )
            }) : 
            (searchedVideogames.length)? currentVideogameSearched.map(v => {
                return (<div key={v.id}>
                    <Videogame name={v.name} image={v.image} genres={v.genres} id={v.id} key={v.id} />
                </div>
                )
            }) : 
            currentVideogame.map(v => {
                return (<div key={v.id}>
                    <Videogame name={v.name} image={v.image} genres={v.genres} id={v.id} key={v.id} />
                </div>
                )
            }) 
            
            /* Si hay algo en searchedVideogames ( o sea, si se realizó una búsqueda ) muestra solo ese/esos videojuego/s. 
            Sino, mostrará todos los videojuegos */
            
        }
        {(showMyGames.length)?
        <Pagination videogamesPerPage={videogamesPerPage} totalVideogames={showMyGames.length} paginate={paginate}/> :
        (filteredByGenre.length)?
        <Pagination videogamesPerPage={videogamesPerPage} totalVideogames={filteredByGenre.length} paginate={paginate}/> :
        (orderedVideogames.length)?
        <Pagination videogamesPerPage={videogamesPerPage} totalVideogames={orderedVideogames.length} paginate={paginate}/> :
        (searchedVideogames.length)?
        <Pagination videogamesPerPage={videogamesPerPage} totalVideogames={searchedVideogames.length} paginate={paginate}/> :
        <Pagination videogamesPerPage={videogamesPerPage} totalVideogames={videogames.length} paginate={paginate}/>
        }
    </div>
}