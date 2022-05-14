import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogame, clear, resetOrder, setSelectedInput } from "../store1/actions";
// import FilterByGenre from "./FilterByGenre";
// import NotFound from "./NotFound";
import Order from "./Order";

export default function Input () {
    
    const [input, setInput] = useState('');         // estado que contiene el valor del input actualizado
    const dispatch = useDispatch();

    function onChangeHandler(e){
        setInput(e.target.value);
    }

    function onSubmitHandler(e){
        e.preventDefault();
        input? dispatch(searchVideogame(input)) : alert('Please enter a videogame to search for it');
        dispatch(resetOrder());
        setInput('');
        dispatch(setSelectedInput(''))
    }

    function onClearHandler(e){
        e.preventDefault();
        dispatch(clear());
        dispatch(resetOrder());
    }

    return <div>
       <div>
            <form action="searchVideogame">
            <input type="text" name="searchVideogame" value={input} id="searchVideogame" placeholder="Search videogames.." onChange={onChangeHandler} />
            <button type="submit" onClick={onSubmitHandler}>Search</button>
            <button onClick={onClearHandler}>Clear</button>
            </form>
       </div>
    </div>
}