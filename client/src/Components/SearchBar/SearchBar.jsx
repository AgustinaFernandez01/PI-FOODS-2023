import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Redux/actions";
import style from "./SearchBar.module.css"
import Logo from "../../Images/Logo.png"; 

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
// manejar el cambio en el campo de entrada de texto
    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    };
// manejar el clic en el botón de búsqueda
    function handleButton(e){
        e.preventDefault();
        dispatch(searchByName(name))
        .then(() =>{ setName("")})        
    };
  
    return (
        <div className={style.searchContainer}>
   {/* Enlace que redirige a la página de inicio */}
            <a href="/home">
              <img src={Logo} alt="FOODIES" className={style.logo} />  
            </a>
 {/* Campo de entrada de texto para buscar */}
            <input className={style.searchInput} type="text" 
            placeholder='Search...' 
            onChange={(e) => handleChange(e)}
            value={name} />
            <button className={style.buttonSearch} type='submit' onClick={ (e) => handleButton(e)} >Search</button>
        </div>
    )
}