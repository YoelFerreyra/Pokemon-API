import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearDetails, pokemonDetails } from '../redux/actions';
import { details, card, img } from './Details.module.css'
import loading from './Loading.gif'

export default function Details() {
  const { id } = useParams();

  const data = useSelector(state=> state.pokemonDetail);
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(pokemonDetails(id))
    return ()=>{
      dispatch(clearDetails());
    }
  },[]);
 console.log(data)
  return (
    <div className={details}>
      <Link to='/home'>
        <button>Home</button>
      </Link>
      { data ?
      <div className={card}>
        <h1>{data.name}</h1>
        <img src={data.img} alt=""/>
        <h3>Stats</h3>
        <span>ID: {data.id}</span>
        <br />
        <span>HP: {data.hp}</span>
        <br />
        <span>Attack: {data.attack}</span>
        <br />
        <span>Defense: {data.defense}</span>
        <br />
        <span>Speed: {data.speed}</span>
        <br />
        <span>Height: {data.height}</span>
        <br />
        <span>Weight: {data.weight}</span>
        {/* <br />
        <span>Tipos: {data.types.map(e=> (<p>{e.name}</p>))}</span> */}
      </div> : <img src={loading}></img>
      }
    </div>
  )
}
