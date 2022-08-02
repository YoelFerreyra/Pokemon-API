import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createPokemon, getAllTypes } from '../redux/actions';
import { container, form } from './CreatePokemon.module.css';

function CreatePokemon() {

    const [ input, setInput ] = useState({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      type: [],
      img: ""
    });
    const [error, setError] = useState({});
    const comprobar = Object.keys(error).length === 0 ? true : false

    const types = useSelector(state=> state.types);
    const dispatch = useDispatch()

    const handleSelect = (e) =>{
      e.preventDefault();
      setInput((prev) => ({
        ...prev,
        type: [...prev.type, e.target.value],
      }))

    }

    useEffect(()=>{
      dispatch(getAllTypes())
    },[dispatch])

    const validation = (input)=>{
      const error = {};
      if (!/^[a-zA-Z ]*$/.test(input.name)){
        error.name = 'Solo se permiten letras'
      } else if(!input.name.length){
        error.name = 'Campo Obligatorio'
      }
      if (input.hp > 250 || input.hp < 1){
        error.hp = 'La vida del pokemon debe ser entre 1 y 250'
      }
      if (input.attack > 250 || input.attack < 1){
        error.attack = 'El ataque del pokemon debe ser entre 1 y 250'
      }
      if (input.defense > 250 || input.defense < 1){
        error.defense = 'La defensa del pokemon debe ser entre 1 y 250'
      }
      if (input.speed > 250 || input.speed < 1){
        error.speed = 'La velocidad del pokemon debe ser entre 1 y 250'
      }
      if (input.height > 250 || input.height < 1){
        error.height = 'La altura del pokemon debe ser entre 1 y 250'
      }
      if (input.weight > 250 || input.weight < 1){
        error.weight = 'El ancho del pokemon debe ser entre 1 y 250'
      }
      return error;
    }

  const handleChange = e => {
    setInput({...input, [e.target.name]:e.target.value})
    setError(validation({...input, [e.target.name]:e.target.value}))
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createPokemon(input))
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      type: [],
      img: ""
    })
    alert('Se a creado correctamente el pokemon')
  }
  const handleDeleteSelect = e => {
    console.log("alla le entran")
    const array = input.type.filter((element) => element !== e.target.id)
    setInput((prev) => ({
      ...prev,
      type: array
    }))

  }

  return (
    <div className={container}>
      <Link to='/home'>
        <button>Home</button>
      </Link>
      <div className={form}>
        <h2>Create Pokemon</h2>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <label>name: </label>
            <input type="text" name='name' value={input.name} onChange={(e)=>handleChange(e)} autoComplete='off' maxLength={10}/>
            {error.name && (<p>{error.name}</p>)}
            <br />
            <label>hp: </label>
            <input type="number" name='hp' value={input.hp} onChange={(e)=>handleChange(e)}  max={250} min={1}/>
            {error.hp && (<p>{error.hp}</p>)}
            <br />
            <label>attack: </label>
            <input type="number" name='attack' value={input.attack} onChange={(e)=>handleChange(e)} max={250} min={1}/>
            {error.attack && (<p>{error.attack}</p>)}
            <br />
            <label>defense: </label>
            <input type="number" name='defense' value={input.defense} onChange={(e)=>handleChange(e)} max={250} min={1}/>
            {error.defense && (<p>{error.defense}</p>)}
            <br />
            <label>speed: </label>
            <input type="number" name='speed' value={input.speed} onChange={(e)=>handleChange(e)} max={250} min={1}/>
            {error.speed && (<p>{error.speed}</p>)}
            <br />
            <label>height: </label>
            <input type="number" name='height' value={input.height} onChange={(e)=>handleChange(e)} max={250} min={1}/>
            {error.height && (<p>{error.height}</p>)}
            <br />
            <label>weight: </label>
            <input type="number" name='weight' value={input.weight} onChange={(e)=>handleChange(e)} max={250} min={1}/>
            {error.weight && (<p>{error.weight}</p>)}
            <br />
            <label>image: </label>
            <input type="text" name='img' onChange={(e)=>handleChange(e)}/>
            <br />
            <label>Type: </label>
            <select name="filterTypes" id="" onChange={handleSelect} disabled={input.type.length === 2}>
              <option hidden>Types</option>
              <option value="all">All</option>
              {types?.map(e=>(
              <option key={e.id} value={e.name}>{e.name}</option>
              ))}
              </select>
              <ul>
                {input.type?.map(e=>(
                  <li id={e} onClick={(el)=>handleDeleteSelect(el)}>{e}</li>
                ))}
              </ul>
              <button type="submit" value="Create" disabled={comprobar&&input.name&&input.hp&&input.attack&&input.defense&&input.speed&&input.height&&input.weight&&input.type.length!==0?false:true}>
                CREATE
              </button>
        </form>
        </div>
    </div>
  )
}

export default CreatePokemon