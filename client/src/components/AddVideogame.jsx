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
        releaseDate: '',
        rating: 0,
        image: '',
        platforms: '',
    })

    //Función para validar los inputs.
    
    const expressionIsAnURL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const expressionIsANumber0to5 = /^[+-]?([0-5]+\.?[0-9]*|\.[0-9]+)$/
    const expressionIsDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/ // yyyy/mm/dd  || yyyy/m/d
    
    // Copiado de MDN *. Esta función servirá para redondear
    function round(num, decimales = 2) {
        var signo = (num >= 0 ? 1 : -1);
        num = num * signo;
        if (decimales === 0) //con 0 decimales
            return signo * Math.round(num);
        // round(x * 10 ^ decimales)
        num = num.toString().split('e');
        num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
        // x * 10 ^ (-decimales)
        num = num.toString().split('e');
        return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
    }

    function validateInputs(input){
        let errors = {
            name: '',
            description: '',
            releaseDate: '',
            rating: 0,
            image: '',
            platforms: '',
        };


        if(input.name === '' ){
            errors.name = 'Name is required';
            document.getElementById("name").className = styles.warning;
        } else if(input.name.length > 30){
            errors.name = 'Name input must have 1-30 characters'
            document.getElementById("name").className = styles.warning;
        } else if(errors.name === ''){
            document.getElementById("name").className = styles.inputBox;
        }

        if(input.description === ''){
            errors.description = 'Description is required';
            document.getElementById("description").className = styles.warningDescription;
        } else if(input.description.length > 1000){
            errors.description = 'Description input must have 1-1000 characters.'
            document.getElementById("description").className = styles.warningDescription;
        } else if(errors.description === ''){
            document.getElementById("description").className = styles.inputDescription;
        }

        if(input.releaseDate !== ''){
            if(input.releaseDate !== ''){
                console.log("Se proporcionó una fecha: ", input.releaseDate);
                if(expressionIsDate.test(input.releaseDate)){

                    console.log("La fecha ingresada cumple con el formato solicitado");
                    errors.releaseDate = '';
                    document.getElementById("releaseDate").className = styles.inputBox;
                    
                } else if(!expressionIsDate.test(input.releaseDate)){
                    
                    console.log("La fecha ingresada NOO cumple con el formato solicitado");
                    errors.releaseDate = 'Must be a date. Date format has to be yyyy-mm-dd using hyphen ( - )';
                    document.getElementById("releaseDate").className = styles.warning;

                }
            } else if(input.releaseDate === ''){

                console.log("No se proporcionó ninguna fecha");
                document.getElementById("releaseDate").className = styles.inputBox;

            }
        }
        if(input.rating !== ''){
            if(expressionIsANumber0to5.test(input.rating) && Number(input.rating) >= 0 && Number(input.rating) <= 5){

                console.log("El rating ingresado es válido", input.rating);
                errors.rating = ''
                console.log(typeof input.rating);
                document.getElementById("rating").className = styles.inputBox;

            } else {

                console.log("El rating ingresado es inválido? : ", input.rating);
                errors.rating = 'Must be number between 0-5. Decimals must be separated by a dot ( . )';
                document.getElementById("rating").className = styles.warning;

            }
        }

        if(input.rating === ''){

            console.log("No recibi nada de rating");
            document.getElementById("rating").className = styles.inputBox;

        }

        if(input.image === ''){
            errors.image = "Image's URL is required";
            document.getElementById("image").className = styles.warning;
        } else if(!expressionIsAnURL.test(input.image)){
            console.log("La URL ingresada es incorrecta");
            errors.image = 'URL not valid.'
            document.getElementById("image").className = styles.warning;
        } else if(errors.image === ''){
            document.getElementById("image").className = styles.inputBox;
        }

        if(input.platforms === ''){
            errors.platforms = 'Platform is required';
            document.getElementById("platforms").className = styles.warning;
        } else if(input.platforms.length > 100){
            errors.platforms = 'Platform input must have 1-100 characters'
            document.getElementById("platforms").className = styles.warning;
        } else if(errors.platforms === ''){
            document.getElementById("platforms").className = styles.inputBox;
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

        let ratingValueAux = 0;

        if(form.rating !== ''){
            ratingValueAux = round(form.rating)
        }

        console.log("ratingValueAux" ,ratingValueAux)

        const postRequirements = {
            name: form.name,
            description: form.description,
            releaseDate: form.releaseDate,
            rating: ratingValueAux,
            image: form.image,
            genre: selectedGenres,
            platforms: form.platforms,
        }

        console.log("post: ", postRequirements)

        if(form.name === '' || form.description === '' || form.image === '' || form.platforms === ''){

            console.log("El que controla todo 1");

            setForm({
                ...form,
                errorWarning: 'Please fill all required inputs before post!'
                })

        } else if(!(errorInput.name === '' && errorInput.description === '' && ratingValueAux <= 5 && ratingValueAux >= 0 && errorInput.image === '' && errorInput.platforms === '' && errorInput.releaseDate === '')){
            
            console.log("Hay un ínput que no cumple");
            
            setForm({
                ...form,
                errorWarning: 'Check the error/s'
            })

        } else if(errorInput.name === '' && errorInput.description === '' && errorInput.image === '' && errorInput.platforms === '' && errorInput.releaseDate === '') {

            console.log("Creando juego...");

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
        } else {
            console.log("No entré en nada...")
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
                    <label htmlFor="name" className={styles.label}>Videogame name*:</label>
                    <textarea type="text" name="name" value = {form.name} id="name" placeholder="Videogame name" onChange={onChangeHandler} className={styles.inputBox} />
                </div>
                    {
                        (errorInput && errorInput.description)? <p className={styles.warningMessage}>{errorInput.description}</p> : null
                    }
                <div className={styles.input}>
                    <label htmlFor="description" className={styles.label}>Description*: </label>
                    <textarea type="text" name="description" value = {form.description} id="description" placeholder="Description" onChange={onChangeHandler} className={styles.inputDescription}/>
                </div>

                    {
                        (errorInput && errorInput.releaseDate)? <p className={styles.warningMessage}>{errorInput.releaseDate}</p> : null
                    }

                <div className={styles.input}>
                    <label htmlFor="releaseDate" className={styles.label}>Release date: </label>   
                    <textarea type="text" name="releaseDate" value = {form.date} id="releaseDate" placeholder="Release date" onChange={onChangeHandler} className={styles.inputBox} />
                </div>

                    {
                        (errorInput && errorInput.rating)? <p className={styles.warningMessage}>{errorInput.rating}</p> : null
                    }
                
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
};