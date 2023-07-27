import React from "react";
import styles from "./Paginado.module.css";



export default function Paginado({ recipesPerPage, recipes, paginate, currentPage }) {
// Crear un array con los números de página necesarios para la paginación
    const pageNum = [];
    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        pageNum.push(i)
    }
    return (
        <div className={styles.center}> 
            <ul className={styles.pagination}>
                {
 // Mapear el array de números de página para crear botones
                    pageNum && pageNum.map(num => (
                        <li key={num}>
                            <button key={num} onClick={() => paginate(num)}
 // Estilo condicional para resaltar el botón de la página actual
                                style={num === currentPage ? { backgroundColor: '#fd684d',color: 'white' ,border: '1px solid #777db8' } : {}}
                            >{num}</button>

                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
