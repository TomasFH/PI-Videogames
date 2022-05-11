import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, clearMyGames, orderBy, resetOrder, setSelectedInput, whichGames } from "../store1/actions";

export default function Order(){

    let searchedVideogames = useSelector(state => state.searchedVideogames)

    const dispatch = useDispatch();

    const [ordered, setOrdered] = useState(false);
    const [justMyGames, setJustMyGames] = useState(false)

    // console.log('Ordered: ', ordered);

    function selected(e){
        dispatch(orderBy(e.target.value));
        dispatch(setSelectedInput(e.target.value));
        setOrdered(true);
    }
    
    function reset(){
        setOrdered(false);
        dispatch(setSelectedInput(''));
        dispatch(clear());
        dispatch(resetOrder());
    }

    function checked(e){
        // console.log(e.target.checked)
        if(e.target.checked){
            dispatch(whichGames())
            setJustMyGames(true)
        }
        if(!e.target.checked){
            dispatch(clearMyGames())
            setJustMyGames(false)
        }
    }


    if(searchedVideogames.length){
        return <div>
            <div>
                Show my games <input type="checkbox" name="myGames" id="myGames" onChange={checked}/>
            </div>
        <div>
        {
                (justMyGames)? // si el cliente quiere ver sólo sus juegos, se elimina el ordenador
                null : 
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
                        <button type="reset" onClick={reset}>reset</button>
                    </form>
                </div>      
            }
        </div>
    </div>
    } else {
        return <div>
            <div>
                Show my games <input type="checkbox" name="myGames" id="myGames" onChange={checked}/>
            </div>
            <div>
            {
                (justMyGames)? // si el cliente quiere ver sólo sus juegos, se elimina el ordenador
                null : 
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
                        <button type="reset" onClick={reset}>reset</button>
                    </form>
                </div>      
            }
            </div>
    </div>
    }
}