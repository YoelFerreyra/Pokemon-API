import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterByOrigin, filterByType, findByName, getAllTypes, orderByAttack, orderByDic, refreshAll } from '../redux/actions';
import {navbar, form} from './Navbar.module.css'
import img from './titulo.png';

export default function Navbar({setearPagina}) {

  const dispatch = useDispatch();
  const [ find, setFind ] = useState("");
  const types = useSelector(state => state.types);

  useEffect(()=>{
    dispatch(getAllTypes())
  },[dispatch])

  const handleSelect = (e) =>{
    e.preventDefault();
    if(e.target.name === 'filterTypes'){
    dispatch(filterByType(e.target.value))
    setearPagina(1)
    }
    if(e.target.name === 'origin'){
      dispatch(filterByOrigin(e.target.value))
      setearPagina(1)
    }
    if(e.target.id === 'order'){
      dispatch(orderByDic(e.target.value))
      setearPagina(1)
    }
    if(e.target.id === 'attack'){
      dispatch(orderByAttack(e.target.value))
      setearPagina(1)
    }
  }

  const handleChange = e => {
    setFind(e.target.value)
  }

  const handleSearch = e =>{
    e.preventDefault()
    setFind(e.target.value)
    dispatch(findByName(find))
    setFind("")
  }

  return (
    <div className={navbar}>
      <img src={img} alt="" />
      <div className={form}>
      <div className={form}>
      <Link to="/">
        <button>Exit</button>
      </Link>
        <button onClick={()=>dispatch(refreshAll())}>Refresh all</button>
      <Link to="/create">
      <button>Create</button>
      </Link>
      </div>
      <form onSubmit={(e) => handleSearch(e)} className={form}>
      <input type="text" name='find' value={find} placeholder='Buscar' onChange={e => handleChange(e)}/>
      <button type='submit'>Buscar</button>
      </form>
      <form action="" className={form}>
      <label>Filter by:</label>
      <select name="filterTypes" id="" onChange={handleSelect}>
          <option hidden>Types</option>
          <option value="all">All</option>
          {types?.map(e=>(
            <option key={e.id} value={e.name}>{e.name}</option>
          ))}
        </select>
        <select name="origin" id="" onChange={handleSelect}>
          <option value="" hidden>
            Origin
          </option>
          <option value="all">
            All
          </option>
          <option value="api">
            api
          </option>
          <option value="created">
            created
          </option>
        </select>
      <select id="order" onChange={handleSelect}>
        <option hidden value="">
          Name
        </option>
        <option value="az">
          a-z
        </option>
        <option value="za">
          z-a
        </option>
      </select>
      <select id="attack" onChange={handleSelect}>
        <option value="" hidden>
          Attack
        </option>
        <option value="+attack">
          + Attack
        </option>
        <option value="-attack">
          - Attack
        </option>
      </select>
      </form>
      
      </div>
      
    </div>
  )
}