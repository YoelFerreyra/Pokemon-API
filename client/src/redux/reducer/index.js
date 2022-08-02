import { CLEAR_DETAILS, CREATE_POKEMON, DELETE_POKEMON, FILTER_BY_ORIGIN, FILTER_BY_TYPE, FIND_BY_NAME, GET_ALL_POKEMONS, GET_ALL_TYPES, ORDER_BY_ATTACK, ORDER_BY_DIC, POKEMON_DETAILS, REFRESH } from "../actions";

const initialState = {
    pokemons: [],
    pokemonDetail: {},
    types: [],
    pokemonsCopy: []
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case GET_ALL_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                pokemonsCopy: action.payload
            }
        case CREATE_POKEMON:
            return state
        case POKEMON_DETAILS:
            const details = state.pokemons.find(e => `${e.id}` === action.payload)
            return{
                ...state,
                pokemonDetail: details
            }
        case FIND_BY_NAME:
            console.log(action.payload)
            return{
                ...state,
                pokemons: action.payload
            }
        case CLEAR_DETAILS:
            return{
                ...state,
                pokemonDetail: {}
            }
        case GET_ALL_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case DELETE_POKEMON:
            return state
        case FILTER_BY_TYPE:
            const data = action.payload === 'all' ? state.pokemonsCopy : state.pokemonsCopy.filter(e=> e.types.map(e=>e.name).includes(action.payload));
            return {
                ...state,
                pokemons: data
            }
        case FILTER_BY_ORIGIN:
            let result;
            if(action.payload === "all"){
                result = state.pokemonsCopy;
            }
            if(action.payload === "api"){
                result = state.pokemonsCopy.filter(e=> e.id < 40)
            }
            if(action.payload === "created"){
                result = state.pokemonsCopy.filter(e=> e.createdInDb)
            }
            return {
                ...state,
                pokemons: result
            }
        case ORDER_BY_DIC:
            let orderAZ;
            if (action.payload === "az") {
                orderAZ = state.pokemons.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (b.name > a.name) return -1;
            return 0;
            });
            }
            if (action.payload === "za") {
                orderAZ = state.pokemons.sort((a, b) => {
                  if (b.name > a.name) return 1;
                  if (a.name > b.name) return -1;
                  return 0;
                });
              }
              return {
                ...state,
                pokemons: orderAZ,
              };
        case ORDER_BY_ATTACK:
            let orderAttack;
            if(action.payload === "+attack"){
                orderAttack = state.pokemonsCopy.sort((a,b)=>parseInt(b.attack) - parseInt(a.attack))
                console.log(orderAttack, "attack +")
            }
            if(action.payload === "-attack"){
                orderAttack = state.pokemonsCopy.sort((a,b)=>a.attack - b.attack)
                console.log(orderAttack, "attack -")
            }
            return {
                ...state,
                pokemons: orderAttack
            }
        case REFRESH:
            return{
                ...state,
                pokemons: state.pokemonsCopy
            }
        default:
            return state
    }
}

export default rootReducer;


