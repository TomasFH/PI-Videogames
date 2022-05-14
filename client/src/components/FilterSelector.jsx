import { useState } from "react"

export default function FilterSelector() {

    const [orderByInput, setOrderByInput] = useState('')

    function radioBtn(e) {
        console.log(e.target.value)
        setOrderByInput(e.target.value);
    }

    return(
        <div>
            <input type="radio" value="a-z" name="order" id="a-z" onChange={radioBtn} />
            <label htmlFor="a-z">Alphabetically</label>

            <input type="radio" value="genre" name="order" id="genre" onChange={radioBtn} />
            <label htmlFor="genre">Genre</label>
        </div>
    )
}