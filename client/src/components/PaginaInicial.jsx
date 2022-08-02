import React from 'react'
import style from './PaginaInicial.module.css'
import {Link} from 'react-router-dom'
import img from './arriba.gif'
import gsap from 'gsap'
import { useEffect } from 'react'

function PaginaInicial() {
  useEffect(()=>{
    const timeline = gsap.timeline();

    const titulo = document.querySelectorAll('.titulo');
    gsap.from(titulo, {opacity:0, y:50, duration:5, stagger: 0.3}, [])
  })
  return (
    <div className={style.PaginaInicial}>
        <h1 className='titulo'>Welcome to Poke Api</h1>
          <Link to='/home' className='titulo'>
            <button className={style.btn}></button>
          </Link>
          <img src={img} alt="" className='titulo'/>
    </div>
  )
}

export default PaginaInicial