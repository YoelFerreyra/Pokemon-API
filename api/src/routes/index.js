const { Router } = require('express');
const { createPokemon, getTypesDb, getAllPokemons, details, getPokemonByName } = require('../controllers/PokemonController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', getAllPokemons);

router.get('/pokemons/:id', details);

router.get('/pokemons?name=', getPokemonByName);

router.post('/pokemons', createPokemon);

router.get('/types', getTypesDb);

module.exports = router;