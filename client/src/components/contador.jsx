import { useSelector, useDispatch } from 'react-redux'
import { aumentar } from '../store1/actions';

export default function Contador() {

    let contador = useSelector(s => s.contador)

    const dispatch = useDispatch();

    function aumento(){
        dispatch(aumentar())
    }

    function checked(e){
        console.log(e.target.checked)
    }

    return(
        <div>
            Soy contador: {contador}  <button onClick={aumento}>+</button>

            <div>
                Checkbox: <input type="checkbox" name="prueba" id="prueba" onClick={checked}/>
            </div>
        </div>
    )
}