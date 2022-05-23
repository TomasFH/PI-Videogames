import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getGenres } from '../store1/actions';
import SelectedInputAddVG from './SelectInputAddVG';
import styles from "./AddVideogame.module.css";


export default function AddVideogame() {

    //Lista de géneros:
    let genreListAux = useSelector(state => state.detailedGenres);
    const [genreList, setGenreList] = useState(genreListAux);
    // const [genresExist, setGenresExist] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);


    
    useEffect(() => {
        
        //Si la lista de géneros ya existe, no se hace ninguna petición por los géneros. Si no existe (ya sea porque se recargó la pág.
        // o porque se accedió directamente a ".../add-videogame") sí hace la petición al Back para obtener dicha lista para usarla
        // en este componente.
        
        if(genreListAux.length === 0) {
            axios.get(`http://localhost:3001/api/genre`)
            .then(r => {
                // console.log("Se ejecutó el axios y devolvió r.data= ", r.data)
                let aux1 = r.data.map(g => g);
                // console.log("Soy aux1: ", aux1);
                setGenreList(aux1);
            });
            // console.log("Se ejecutó el dispatch");
            // setGenresExist(true);
        }

    }, [])

    
    //---------------------------------------------------------------------------------------------------------------------------------------
    
    //Estados para controlar mi formulario:
    
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [date, setDate] = useState('');
    // const [rating, setRating] = useState(0);
    // const [image, setImage] = useState('');
    
    
    // En principio la idea de arriba funcionaría, pero para optimizar genero un único estado para todos mis formularios y, gracias a ello
    //  una única función que cambiará la 'porción' de estado que necesite en vez de tener que invocar 5 funciones distintas (en este caso)
    //  para cambiar el estado correspondiente.
    
    //---------------------------------------------------------------------------------------------------------------------------------------

    //Único estado para todos mis formularios:

    const [form, setForm] = useState({
        name: '',
        description: '',
        releaseDate: '',
        rating: '',
        image: '',
        errorWarning: '',
        genre: [],
        platforms: '',
        createdVideogameID: '',
        success: '',
    });

    const [errorInput, setErrorInput] = useState({
        name: '',
        description: '',
        image: '',
        platforms: '',

    })

    //Función para validar los inputs.

    function validateInputs(input){
        let errors = {};

        const expressionIsAnURL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;


        if(input.name === ''){
            errors.name = 'Name is required';
        }
        if(input.description === ''){
            errors.description = 'Description is required';
        }
        if(input.image === ''){
            errors.image = "Image's URL is required";
        } else if(!expressionIsAnURL.test(input.image)){
            console.log("La URL ingresada es incorrecta");
            errors.image = 'URL not valid.'
        }
        if(input.platforms === ''){
            errors.platforms = 'Platform is required';
        }

        return errors;
    }

    //Función que creará una propiedad en el objeto del estado o, si ya existe, modifica su valor.

    function onChangeHandler(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        let errorResults = validateInputs({
            ...form,
            [e.target.name]: e.target.value
        })

        setErrorInput(errorResults);
    }

    //Función encargada de agregar un género a la lista de géneros que se van a vincular al juego creado.

    function linkGenre(e){

        // Elimino de la lista de géneros del input <select> la opción que haya sido seleccionada para evitar que se duplique la info.

        let genreDeletedFromList;

        genreDeletedFromList = genreList.filter(g => {
            return g.name === e.target.value
        })

        setGenreList(genreList.filter(g => {
            return g.name !== e.target.value
        }))

        setSelectedGenres([
            ...selectedGenres,
            genreDeletedFromList[0]
        ])

        //-------------------
        //Estas 2 líneas de abajo resetean el input <select> así logro evitar que no se pueda seleccionar 'Action' por ser la primera
        // opción después del 'Select an option' que está en disabled.

        let selectInputAux = document.getElementById("linkGenres");
        selectInputAux.value = 'Select an option';

    }

    function onClose(genre){
        let aux = selectedGenres;
        let aux1 = aux.filter(g => {
            return g.name === genre
        })
        let aux2 = aux.filter(g => {
            return g.name !== genre
        })
        setGenreList([
            ...genreList,
            aux1[0]
        ])

        // console.log("Soy aux1: ", aux1)
        setSelectedGenres(aux2);
    }

    //Función encargada de hacer el post.

    async function onSubmitHandler(e){

        e.preventDefault(); // para no recargar la pág.

        const postRequirements = {
            name: form.name,
            description: form.description,
            releaseDate: form.releaseDate,
            rating: form.rating,
            image: form.image,
            genre: selectedGenres,
            platforms: form.platforms,
        }
        
        if(form.name === ''){
            setForm({errorWarning: 'Please fill all required inputs before post!'})
            document.getElementById("name").className = styles.warning;
        }
        if(form.description === ''){
            setForm({errorWarning: 'Please fill all required inputs before post!'})
            document.getElementById("description").className = styles.warningDescription;
        }
        if(form.image === ''){
            setForm({errorWarning: 'Please fill all required inputs before post!'})
            document.getElementById("image").className = styles.warning;
        }
        if(form.platforms === ''){
            setForm({errorWarning: 'Please fill all required inputs before post!'})
            document.getElementById("platforms").className = styles.warning;
        }
        if(form.name === '' || form.description === '' || form.image === '' || form.platforms === ''){
            setForm({
                ...form,
                errorWarning: 'Please fill all required inputs before post!'
                })
        } else {
            axios.post(`http://localhost:3001/api/videogame`, postRequirements)
            .then(r => {
                // console.log("Soy asd", r.data);
                document.getElementById("name").className = styles.inputBox
                document.getElementById("description").className = styles.inputDescription;
                document.getElementById("image").className = styles.inputBox;
                document.getElementById("platforms").className = styles.inputBox;

                setForm({
                    ...form,
                    createdVideogameID: r.data.id,
                    errorWarning: '',
                    success: 'Videogame was created successfully!'
                })
                
                //Ahora que tengo la ID del nuevo juego que acabo de crear le vinculo el o los géneros que el cliente
                // haya especificado.
                let newGameID = r.data.id;

                // console.log("La id del nuevo juego es: ", newGameID)
                postRequirements.genre.map(g => {
                    axios.post(`http://localhost:3001/api/videogame/link-to-genre/${newGameID}/${g.id}`) //1ro el juego, 2do el género
                })
            })
            .catch(error => {
                // console.log(error.response.data);
                if(error.response.data === 'llave duplicada viola restricción de unicidad «videogames_name_key»'){
                    // console.log('There is a videogame with that name already. Please try with another name.');
                    setForm({
                        ...form,
                        errorWarning: 'There is a videogame with that name already. Please try with another name.',
                        success: '',
                    });
                    document.getElementById("name").className = styles.warning;
                }
            })
        }
    }

    return <div>
        <h4>Add a videogame!</h4>

        {
            (form.errorWarning)? 
            <div className={styles.error}>{form.errorWarning}</div> :
            null
        }
        {
            (form.success)? 
            <div className={styles.success}>{form.success}</div> :
            null
        }

        <div className={styles.divForm}>
        <form onSubmit={onSubmitHandler} className={styles.form}>
                    {
                        (errorInput && errorInput.name)? <p className={styles.warningMessage}>{errorInput.name}</p> : null
                    }
                <div className={styles.input}>
                    <label htmlFor="name" className={styles.label}>Videogame name:</label>
                    <textarea type="text" name="name" value = {form.name} id="name" placeholder="Videogame name" onChange={onChangeHandler} className={styles.inputBox} />
                </div>
                    {
                        (errorInput && errorInput.description)? <p className={styles.warningMessage}>{errorInput.description}</p> : null
                    }
                <div className={styles.input}>
                    <label htmlFor="description" className={styles.label}>Description: </label>
                    <textarea type="text" name="description" value = {form.description} id="description" placeholder="Description" onChange={onChangeHandler} className={styles.inputDescription}/>
                </div>

                <div className={styles.input}>
                    <label htmlFor="releaseDate" className={styles.label}>Release date: </label>   
                    <textarea type="text" name="releaseDate" value = {form.date} id="releaseDate" placeholder="Release date" onChange={onChangeHandler} className={styles.inputBox} />
                </div>
                
                <div className={styles.input}>
                    <label htmlFor="rating" className={styles.label}>Rating: </label>
                    <textarea type="text" name="rating" value = {form.rating} id="rating" placeholder="Rating" onChange={onChangeHandler} className={styles.inputBox} />
                </div>

                    {
                        (errorInput && errorInput.image)? <p className={styles.warningMessage}>{errorInput.image}</p> : null
                    }
                <div className={styles.input}>
                    <label htmlFor="image" className={styles.label}>Image URL* : </label>
                    <textarea type="text" name="image" value = {form.image} id="image" placeholder="Image's URL" onChange={onChangeHandler} className={styles.inputBox} />
                </div>

                    {
                        (errorInput && errorInput.platforms)? <p className={styles.warningMessage}>{errorInput.platforms}</p> : null
                    }
                <div className={styles.input}>
                    <label htmlFor="platforms" className={styles.label}>Platforms* : </label>
                    <textarea type="text" name="platforms" value = {form.platforms} id="platforms" placeholder="Available on..." onChange={onChangeHandler} className={styles.inputBox} />
                </div>

                { /* Vincular géneros al juego que se está creando. */}

                <select name="linkGenres" id="linkGenres" onChange={linkGenre} defaultValue='Select an option' className={styles.input}>
                    <option value="Select an option" disabled>Link genres</option>
                    {

                        genreList.map(g => {
                            return(
                                <option value={g.name} key={g.id}>{g.name}</option>
                            )
                        })
                        
                    }
                </select>

                <button type="submit" id="submit" className={styles.button}>Add videogame</button>
            </form>
        </div>
        <div className={styles.genresChosen}>
        {
            (selectedGenres.length)?
            selectedGenres.map(genre => {
                return <SelectedInputAddVG 
                genre={genre}
                onClose={onClose}
                key={genre.id}
                />
            }) :
            null
        }
        </div>

    </div>
}


// HAY QUE VINCULAR 

// HAY QUE HACER TODO LO QUE HICE PARA GENRES, PERO AHORA PARA PLATFORM.

// HAY QUE HACER QUE LE LLEGUE ALGO A PLATFORMS. SINO, EL POST TIRA ERROR PORQUE ES OBLIGATORIO AGREGAR PLATFORM/S.
