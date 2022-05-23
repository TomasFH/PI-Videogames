import axios from 'axios'

export const AUMENTAR = 'AUMENTAR';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';
export const CLEAR = 'CLEAR';
export const ORDER_BY = 'ORDER_BY';
export const RESET_ORDER = 'RESET_ORDER';
export const SET_SELECTED_INPUT = 'SET_SELECTED_INPUT';
export const WHICH_GAMES = 'WHICH_GAMES';
export const CLEAR_MY_GAMES = 'CLEAR_MY_GAMES';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const CLEAR_BY_GENRE = 'CLEAR_BY_GENRE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const SHOW_MY_GAMES_ONLY = 'SHOW_MY_GAMES_ONLY';
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

export function aumentar() {
    return {
        type: AUMENTAR,
        payload: '+'
    }
}

export function getVideogames(){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/videogame`)
        .then(r => {
            dispatch({
                type: GET_VIDEOGAMES,
                payload: r.data
            })
        })
    }
}

export function searchVideogame(name){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/videogame?name=${name}`)
        .then(r => {
            dispatch({
                type: SEARCH_VIDEOGAME,
                payload: r.data
            })
        })
    }
}

export function clear(){
    return {
        type: CLEAR,
    }
}

export function orderBy(order){
    return {
        type: ORDER_BY,
        payload: order
    }
}

export function resetOrder(){
    return {
        type: RESET_ORDER
    }
}

export function setSelectedInput(e){
    return {
        type: SET_SELECTED_INPUT,
        payload: e
    }
}

export function whichGames(){
    return {
        type: WHICH_GAMES,
    }
}

export function clearMyGames(){
    return {
        type: CLEAR_MY_GAMES,
    }
}

export function getGenres(){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/genre`)
        .then(r => {
            dispatch({
                type: GET_GENRES,
                payload: r.data
            })
        })
    }
}

export function filterByGenre(genre){
    return {
        type: FILTER_BY_GENRE,
        payload: genre
    }
}

export function clearByGenre(){
    return {
        type: CLEAR_BY_GENRE,
    }
}

export function clearMessage(){
    return {
        type: CLEAR_MESSAGE,
    }
}

export function showMyGamesOnly(shouldShow){
    return {
        type: SHOW_MY_GAMES_ONLY,
        payload: shouldShow
    }
}

export function changeCurrentPage(number){
    return {
        type: CHANGE_CURRENT_PAGE,
        payload: number
    }
}