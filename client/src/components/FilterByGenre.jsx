import { useDispatch, useSelector } from "react-redux"
import { filterByGenre, getGenres } from "../store1/actions";

export default function FilterByGenre() {

    // let allVideogames = useSelector(state => state.videogames);
    let allGenres = useSelector(state => state.genres);

    const dispatch = useDispatch();

    // function getGenresList(){
    //     dispatch(getGenres())
    // }

    function selected(e){
        console.log(e.target.value); // género
        dispatch(filterByGenre(e.target.value))
    }

    /* HAY QUE HACER QUE LOS VIDEOJUEGOS FILTRADOS POR GÉNERO SE MUESTREN EN PANTALLA (solo hice que los
        valores se guarden en un arreglo distinto; ese arreglo es el que hay que mostrar) */

    return(
        <div>
                {/* <button onClick={getGenresList}>Traer géneros</button> esto hay que cambiarlo por el useEffect */}
            <div>

                <>Genre </>

                <select name="genre" id="genreSelect" onChange={selected} defaultValue="Select an option">
                    <option value="Select an option" disabled>Select an option</option>
                    {
                        allGenres.map(g => {
                            return <option value={g} key={g}>{g}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}