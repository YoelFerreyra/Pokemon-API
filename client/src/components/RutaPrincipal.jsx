import {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getAllPokemons, getAllTypes } from '../redux/actions';
import Card from './Card';
import Navbar from './Navbar';
import { Paginacion } from './Paginacion';
import {home, cards, paginacion, load} from './RutaPrincipal.module.css'
import loading from './pika.gif'

export const RutaPrincipal = () => {
    // ESTADOS DE PAGINACION

    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(12);

    const dispatch = useDispatch();
    const pokemons = useSelector(state=>state.pokemons);
    const types = useSelector(state=>state.types)

    useEffect(()=>{
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
    },[dispatch])

    const maximo = pokemons.length / porPagina;
    
  return (
    <div className={home}>
        <Navbar setearPagina={setPagina}></Navbar>
        <div className={cards}>
        {   
            pokemons.length>1 ? pokemons.slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
            ).map(e=>{
            return(
                    <Card key={e.id} name={e.name} img={e.img} types={e.types} id={e.id}></Card>
            )
            }) : <h1>No se encontro pokemon</h1>
        } 

        </div>
        <div className={paginacion}>
            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
    </div>
  )
}