import React from "react";
import { Link } from "react-router-dom";
import style from './Card.module.css';

// Componente funcional Card 
export default function Card({ img, name, diets, id }) {

    return (
        <div className={style.cardContainer}>
            <div className={`${style.card} ${style.uClearfix}`}>
                <div className={style.cardBody}>
                    <h2 className={style.cardTitle}>{name}</h2>
                    <ul className={`${style.cardDescription} ${style.subtle}`}>{diets?.map(d => {
                      if(typeof d === 'string'){
                     return < div key={d}>{d}</div>   
                    } else {
                        return < div key={d.name}>{d.name}</div> 
                    }
                    })}</ul> 
                    <div >
                        <Link to={`/detail/${id}`} className={style.cardRead}>
                        See recipe details</Link>
                    </div>
                </div>
                <img src={img} alt="not found" width="300px" height="300px" className={style.cardMedia} />
            </div>
            <div className={style.cardShadow}></div>
        </div>
    )
}