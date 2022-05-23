import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchVideogame, clear, resetOrder, setSelectedInput, clearByGenre, clearMyGames } from "../store1/actions";
// import FilterByGenre from "./FilterByGenre";
// import NotFound from "./NotFound";
import Order from "./Order";
import style from "./Input.module.css";

export default function Input () {
    
    const [input, setInput] = useState('');         // estado que contiene el valor del input actualizado
    const dispatch = useDispatch();
    let videogames = useSelector(state => state.videogames);
    let showMyGames = useSelector(state => state.showMyGames);

    function onChangeHandler(e){
        setInput(e.target.value);
    }

    function onSubmitHandler(e){
        e.preventDefault();
        input? dispatch(searchVideogame(input)) : alert('Please enter a videogame to search for it');
        dispatch(resetOrder());
        setInput('');
        dispatch(setSelectedInput(''));
        dispatch(clearMyGames());
        dispatch(clearByGenre());
        if(document.getElementById("myGames").checked){
            document.getElementById("myGames").checked = false;
            dispatch(clearMyGames());
            dispatch(clear());
            dispatch(resetOrder());
        }
    }

    function onClearHandler(e){
        e.preventDefault();
        dispatch(clear());
        dispatch(resetOrder());
        dispatch(clearByGenre());
        let auxAZ = document.getElementById("a-z");
        let auxGenre = document.getElementById("genre");
        if(auxAZ?.checked){
            document.getElementById("orderSelect").value = "Select an option";
            auxAZ.checked = false
        }
        if(auxGenre?.checked){
            document.getElementById("genreSelect").value = "Select an option";
            auxGenre.checked = false
        }
    }

    if(!(videogames.length)){
        return <div></div>
    }

    return <div>
       <div>
            <form action="searchVideogame">
            <input type="text" name="searchVideogame" value={input} id="searchVideogame" placeholder="Search videogames.." onChange={onChangeHandler} className={style.searchInput}/>
            <button type="submit" onClick={onSubmitHandler} className={style.searchBtn}>Search</button>
            {
                (showMyGames.length)?
                null :
                <button onClick={onClearHandler} className={style.resetSearch}>Reset</button> 
            }
            </form>
       </div>
    </div>
}