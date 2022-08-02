import axios from 'axios';

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const POKEMON_DETAILS = "POKEMON_DETAILS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const FILTER_BY_TYPE ="FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"
export const ORDER_BY_DIC = "ORDER_BY_DIC";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const FIND_BY_NAME = "FIND_BY_NAME";
export const REFRESH = "REFRESH"

export const getAllPokemons = ()=>{
        return (dispatch) => {
            return axios("http://localhost:3001/pokemons")
              .then(res => dispatch({ type: GET_ALL_POKEMONS, payload: res.data}))
              .catch(e => console.log(e))
          }
}
export const createPokemon = (payload)=>{
  return (dispatch) => {
    const pokemon = axios.post("http://localhost:3001/pokemons", payload)
    return pokemon
  }
}
export const getAllTypes = (payload)=>{
  return (dispatch) => {
    return axios("http://localhost:3001/types")
    .then(res => dispatch({type: GET_ALL_TYPES, payload: res.data}))
    .catch(e=>console.log(e))
  }
}

export const findByName = (name)=>{
  return(dispatch) => {
    return axios("http://localhost:3001/pokemons?name="+name)
    .then(res => dispatch({type: FIND_BY_NAME, payload: res.data}))
    .catch(e=>console.log(e))
  }
}

export const pokemonDetails = (id)=>{
  return (dispatch) => {
    return dispatch({type: POKEMON_DETAILS, payload: id})
  }
}
export const deletePokemon = (id)=>{
  return (dispatch) => {
    return axios.delete("http://localhost:3001/pokemons/"+id)
    .then(res => dispatch({type: DELETE_POKEMON}))
    .catch(e => console.log(e))
  }
}
export const filterByType = (payload)=>{
    return (dispatch)=> dispatch({type: FILTER_BY_TYPE, payload})
}
export const filterByOrigin = (payload)=>{
    return (dispatch)=> dispatch({type: FILTER_BY_ORIGIN, payload})
}
export const orderByDic = (payload)=>{
  return function (dispatch) { 
    return (dispatch)=> dispatch({type: ORDER_BY_DIC, payload})
  }
}
export const orderByAttack = (payload)=>{
  return (dispatch)=> dispatch({type: ORDER_BY_ATTACK, payload})
}
export const clearDetails = ()=>{
  return(dispatch) => {
    return dispatch({type: CLEAR_DETAILS});
  }
}
export const refreshAll = ()=>{
  return(dispatch) => {
    return dispatch({type: REFRESH});
}
}