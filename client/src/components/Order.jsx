import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, clearByGenre, clearMyGames, orderBy, resetOrder, setSelectedInput, whichGames } from "../store1/actions";
import FilterByGenre from "./FilterByGenre";

export default function Order(){

    let videogames = useSelector(state => state.videogames);
    let searchedVideogames = useSelector(state => state.searchedVideogames);

    const dispatch = useDispatch();

    // const [ordered, setOrdered] = useState(false);
    const [orderByInput, setOrderByInput] = useState('')
    const [justMyGames, setJustMyGames] = useState(false);

    // console.log('Ordered: ', ordered);

    function selected(e){
        dispatch(orderBy(e.target.value));
        dispatch(setSelectedInput(e.target.value));
        // setOrdered(true);
    }
    
    function reset(){
        // setOrdered(false);
        dispatch(setSelectedInput(''));
        dispatch(clear());
        dispatch(resetOrder());
        dispatch(clearByGenre());
    }

    function checked(e){
        // console.log(e.target.checked)
        if(e.target.checked){
            dispatch(whichGames());
            setJustMyGames(true);
        }
        if(!e.target.checked){
            dispatch(clearMyGames());
            setJustMyGames(false);
            reset();
        }
    }
    
    function radioBtn(e) {
        // console.log(e.target.value);
        setOrderByInput(e.target.value);
        reset()
    }
    

    if(!(videogames.length)){
        return <div></div>
    }


    if(searchedVideogames.length){
        return <div>
        <div>
            <div>
                Show my games <input type="checkbox" name="myGames" id="myGames" onChange={checked}/>
            </div>

            {
                (justMyGames)? // si el cliente quiere ver sólo sus juegos, se elimina el ordenador
                null : 
                <div>
                    <div>
                        <form action="order">
                        <>Order by </>
                            <select name="order" id="order" onChange={selected} defaultValue="Select an option">
                                <option value="Select an option" disabled>Select an option</option>
                                <option value="A-Z" >A-Z</option>
                                <option value="Z-A">Z-A</option>
                                <option value="Rating (+)">Rating (+)</option>
                                <option value="Rating (-)">Rating (-)</option>
                            </select>
                            {/* <button type="reset" onClick={reset}>reset</button> */}
                        </form>
                    </div>
                </div>
            }
        </div>
    </div>
    } else {
        return <div>
        <div>
            <div>
                Show my games <input type="checkbox" name="myGames" id="myGames" onChange={checked}/>
            </div>

            {
                (justMyGames)? null: 
                (<div>
                    <input type="radio" value="a-z" name="order" id="a-z" onChange={radioBtn} />
                    <label htmlFor="a-z">Alphabetically or rating</label>
    
                    <input type="radio" value="genre" name="order" id="genre" onChange={radioBtn} />
                    <label htmlFor="genre">Genre</label>
                </div>)
            }

            {
                (justMyGames)? // si el cliente quiere ver sólo sus juegos, se elimina el ordenador
                null : 
                (orderByInput === 'a-z')? (<div>
                    <div>
                        <form action="order">
                        <>Order by </>
                            <select name="order" id="order" onChange={selected} defaultValue="Select an option">
                                <option value="Select an option" disabled>Select an option</option>
                                <option value="A-Z" >A-Z</option>
                                <option value="Z-A">Z-A</option>
                                <option value="Rating (+)">Rating (+)</option>
                                <option value="Rating (-)">Rating (-)</option>
                            </select>
                            {/* <button type="reset" onClick={reset}>reset</button> */}
                        </form>
                    </div>
                </div>
                )  :
                (orderByInput === 'genre')? (
                    <div>
                        <FilterByGenre />
                    </div>
                ) : null 
            }
        </div>
    </div>
    }
}


// Habría que buscar la manera de que si se tilda el checkbox de solo mostrar 'My videogames' no se reseteen los valores de los select's o, en cambio,
//  hacer que se reinicien los ordenadores (borrar los estados con los arreglos ordenados o filtrados por género) (esta última opción la veo más viable!)