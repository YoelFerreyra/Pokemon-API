import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({name, img, types, id}) {
  return (
    <div className={styles.card} key={id}>
      <img src={img} alt="" />
      <h2>{name}</h2>
      <p>Tipo: {types.map(e=>{return `${e.name} `})}</p>
      <Link to={`/home/`+id}>
      <button className={styles.btn}>Detalles</button>
      </Link>
    </div>
  )
}
