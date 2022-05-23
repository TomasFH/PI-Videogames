import { AUMENTAR, CLEAR, CLEAR_BY_GENRE, CLEAR_MESSAGE, CLEAR_MY_GAMES, FILTER_BY_GENRE, GET_GENRES, GET_VIDEOGAMES, ORDER_BY, RESET_ORDER, SEARCH_VIDEOGAME, SET_SELECTED_INPUT, WHICH_GAMES } from "../actions";

const initialState = {
    contador: 0,
    videogames: [],
    searchedVideogames: [],
    orderedVideogames: [],
    showMyGames: [],
    genres: [],
    detailedGenres: [],
    filteredByGenre: [],
    selectedInput: '',
    filteredByGenreNotFound: '',
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case AUMENTAR:
            return {
                ...state,
                contador: state.contador + 1
            }

        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
            }

        case SEARCH_VIDEOGAME:
            return {
                ...state,
                searchedVideogames: action.payload,
            }

        case CLEAR:
            return {
                ...state,
                searchedVideogames: []
            }

        case ORDER_BY:
            
            let aux;

            let defaultPopularity = state.videogames

            if(state.searchedVideogames.length){
                // si el cliente filtra habiendo hecho ya una búsqueda en el buscador (y obtuvo resultado)
                aux = [...state.searchedVideogames]
            } else { // sino, se basa en todas los videojuegos
                aux = [...state.videogames]
            }
            // console.log('action: ', action.payload)
            switch(action.payload){

                case "Popularity":
                    // console.log('Me ejecuté: ', action.payload);
                    aux = defaultPopularity;
                break;

                case "A-Z":
                    // console.log('Me ejecuté: ', action.payload);
                    aux = aux.sort((a,b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1
                        }
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }

                        return 0;
                        /* si el nombre es 'menor' (en terminos alfabéticos (?) ) devuelve -1;
                        si es mayor, 1; y, si es igual, 0. En vase a esos valores acomoda
                        izq o derecha en el arreglo*/
                    })
                    // console.log(aux);
                break;

                case "Z-A":
                    // console.log('Me ejecuté: ', action.payload);
                    aux = aux.sort((a,b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1
                        }
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        }

                        return 0;
                        /* si el nombre es 'menor' (en terminos alfabéticos (?) ) devuelve -1;
                        si es mayor, 1; y, si es igual, 0. En vase a esos valores acomoda
                        izq o derecha en el arreglo*/
                    })
                    // console.log(aux);
                break;

                case "Rating (+)":
                    // console.log('Me ejecuté: ', action.payload);
                    aux = aux.sort((a,b) => {
                        if(a.rating < b.rating) {
                            return 1
                        }
                        if(a.rating > b.rating) {
                            return -1
                        }
                        
                        return 0;
                        /* si el nombre es 'menor' (en terminos alfabéticos (?) ) devuelve -1;
                        si es mayor, 1; y, si es igual, 0. En vase a esos valores acomoda
                        izq o derecha en el arreglo*/
                    })
                    // console.log(aux);
                break;
                    
                    case "Rating (-)":
                        // console.log('Me ejecuté: ', action.payload);
                        aux = aux.sort((a,b) => {
                            if(a.rating < b.rating) {
                                return -1
                        }
                        if(a.rating > b.rating) {
                            return 1
                        }

                        return 0;
                        /* si el nombre es 'menor' (en terminos alfabéticos (?) ) devuelve -1;
                        si es mayor, 1; y, si es igual, 0. En vase a esos valores acomoda
                        izq o derecha en el arreglo*/
                    })
                    // console.log(aux);
                break;

                default:
                    aux = [];
                    return aux;
            }
            return {
                ...state,
                orderedVideogames: aux //check
            }
        
        case RESET_ORDER:
            return {
                ...state,
                orderedVideogames: []
            }

        case SET_SELECTED_INPUT:
            // console.log(action.payload);
            return {
                ...state,
                selectedInput: action.payload
            }

        case WHICH_GAMES:

            let allGames = state.videogames;
            let searchedVideogames = state.searchedVideogames;
            let orderedVideogames = state.orderedVideogames;
            let myGames;

            if(allGames.length){
                myGames = allGames.filter(g => {
                    return g.id.length > 8
                })
            }

            return {
                ...state,
                showMyGames: myGames
            }

        case CLEAR_MY_GAMES:
            return {
                ...state,
                showMyGames: []
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload.map(g => {
                    return g.name
                }),
                detailedGenres: action.payload.map(g => {
                    return g
                })
            }

            case FILTER_BY_GENRE:

                let filteredByGenre = state.videogames.filter(game => {
                    return (game.genres.filter(genre => genre.name === action.payload).length > 0)
                })

                if(filteredByGenre.length === 0){
                    return {
                        ...state,
                        filteredByGenreNotFound: 'There are not videogames that matches with that genre. Try with another one.'
                    }
                }

                return {
                    ...state,
                    filteredByGenre,
                    filteredByGenreNotFound: ''
                }

            case CLEAR_BY_GENRE:
                return {
                    ...state,
                    filteredByGenre: []
                }

            case CLEAR_MESSAGE:
                return {
                    ...state,
                    filteredByGenreNotFound: ''
                }


        default:
            return state;
    }
}