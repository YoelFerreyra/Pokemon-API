const axios = require('axios');
const { query } = require('express');
const e = require('express');
const {Pokemon, Tipo} = require('../db');

let id = 0;

async function getPokemonsApi(req ,res ,next){

    try{

        let pokemons = (await axios('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results
        let array = await pokemons.map(e=> e.url)

        // const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');
        // const apiUrlRest = await axios.get(apiUrl.data.next);
        // const apiUrlRest2 = await axios.get(apiUrlRest.data.next);
        // const allPokemons = await apiUrl.data.results.concat(apiUrlRest.data.results).concat(apiUrlRest2.data.results);

        let data = await axios.all(pokemons.map(async (pokemon)=> await axios.get(pokemon.url)));
        let results = data.map(e=> e.data);
        const pokeArray = results.map((element) => {
            return {
                id: element.id,
                name: element.name,
                hp: element.stats[0].base_stat,
                attack: element.stats[1].base_stat,
                defense: element.stats[2].base_stat,
                speed: element.stats[5].base_stat,
                height: element.height / 10,
                weight: element.weight / 10,
                types: element.types.map((element) => {
                    return { name: element.type.name };
                }),
                img: element.sprites.other.home.front_default,
            };
        });
        return pokeArray
        
    }catch(error){
        console.log(error)
    }
}

async function getPokemondb (){

    try {

        const pokemons = await Pokemon.findAll({
            include:{  
              model: Tipo,
              attributes:["name"]
              ,
              throught:{   
                attributes:[]
              }
            }
          });
          const data = pokemons.map((element) => {
            return {
                id: element.id,
                name: element.name,
                hp: element.hp,
                attack: element.attack,
                defense: element.defense,
                speed: element.speed,
                height: element.height,
                weight: element.weight,
                types: element.tipos.map((element) => {
                    return { name: element.name};
                }),
                img: element.img,
                createdInDb: element.createdInDb
            };
        })
        
        return data

    } catch (error) {
        console.log(error)
    }
}

async function getAllPokemons(req, res , next){

    let name = req.query.name;

    try {
        if(name){
            const data = await getPokemonByName(name)
            res.send(data)
        }else{
        const apiInfo = await getPokemonsApi()
        const dbInfo = await getPokemondb()
        console.log(dbInfo,"getall")
        const allPokemonsInfo = apiInfo.concat(dbInfo);
        res.send(allPokemonsInfo);
        }
    } catch (error) {
        next(error)
    }
}



async function details (req, res, next){

    const { id } = req.params

    try{

        let pokemon = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data

        let data = {
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height / 10,
                weight: pokemon.weight / 10,
                types: pokemon.types.map((element) => {
                    return { name: element.type.name };
                }),
                img: pokemon.sprites.other.home.front_default,
        }
        res.send(data)
        }catch(error){
            next(error)
        }
}

async function getPokemonByName (name){

    try{

        const result = await Pokemon.findAll({
            where:{name: name},
            include:{  
                model: Tipo,
                attributes:["name"]
                ,
                throught:{   
                  attributes:[]
                }
              }
        })

        console.log(result, 'este es el result')

        const final = result.map(element=> ({
                id: element.id,
                name: element.name,
                hp: element.hp,
                attack: element.attack,
                defense: element.defense,
                speed: element.speed,
                height: element.height,
                weight: element.weight,
                types: element.tipos.map((element) => {
                    return { name: element.name};
                }),
                img: element.img
        }))

        console.log(final, 'este es el console final')

        if(result.length === 0){
        
        let pokemon = (await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)).data

        let data = [{
            id: pokemon.id,
            name: pokemon.name,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
            types: pokemon.types.map((element) => {
                return { name: element.type.name };
            }),
            img: pokemon.sprites.other.home.front_default,
        }]

        return data
        
        } else return final

        }catch(error){
            console.log(error)
        }
}

async function getTypesApi (){
    try {
        let types = (await axios('https://pokeapi.co/api/v2/type')).data.results
        
        let type = types.map(e=> Tipo.findOrCreate({
            where: {name: e.name}
        }))

    } catch (error) {
        console.log(error)
    }
}

async function getTypesDb(req, res, next){
    try {
        await getTypesApi()
        const types = await Tipo.findAll()
        res.send(types)
    } catch (error) {
        next(error)
    }
}

async function createPokemon(req, res, next){
    try {

        const {name, hp, attack, defense, speed, height, weight, type, img} = req.body;
        const msg = 'Pokemon creado correctamente'
        const obj = {name, hp: parseInt(hp), attack: parseInt(attack), defense: parseInt(defense),
             speed: parseInt(speed), height: parseInt(height), weight: parseInt(weight), img}

        const data = await Pokemon.create(obj)

        const newTypes = await Tipo.findAll({where: {name: type}})

        data.addTipo(newTypes) // Crea un realcion

        res.send(msg)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getPokemonsApi,
    getTypesApi,
    getTypesDb,
    createPokemon,
    getPokemondb,
    getAllPokemons,
    details,
    getPokemonByName
}

