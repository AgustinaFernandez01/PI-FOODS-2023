import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getDiets, filterByDiets, orderByName, orderByScore, filteredRecipes } from "../../Redux/actions";
import Card from "../../Components/Card/Card";
import Paginado from "../../Components/Paginado/Paginado";
import style from "./HomePage.module.css"
import SearchBar from "../../Components/SearchBar/SearchBar";
import { NavLink } from "react-router-dom";

 
export default function Home() {
    const dispatch = useDispatch();
//estados
    const recipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets);
    const [recipeBook, setrecipeBook] = useState(true)
    const [filterValues, setFilterValues] = useState({
        orderByName: "default",
        orderByScore: "default",
        filterByDiets: "default",
        filteredRecipes: "default"
      });
    
// UseEffect para obtener las recetas y tipos de dieta cuando se carga la página
    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getDiets())
    }, []);

// Definición de estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);    // pagina que ira cambiando
    const [recipesPerPage, setRecipesPerPage] = useState(9); // cantidad de recetas por pagina
    const lastRecipe = recipesPerPage * currentPage; //9     // indice ultima receta renderizada
    const firstRecipe = lastRecipe - recipesPerPage; //0         // indice primera receta renderizada
    const currentRecipes = recipes.slice(firstRecipe, lastRecipe); // las 9 recetas que se iran mostrando en cda pág

    useEffect(()=> {
    }, [recipes])
// cambiar la página actual en la paginación
    const paginate = (number) => {
        setCurrentPage(number)
    };

  // volver a la primera página después de aplicar filtros u ordenamientos
    function returnToFirstPage() {
        setCurrentPage(1)
    };
   
 // filtrar las recetas por tipo de dieta 
 function handleFilterByDiets(e) {
    dispatch(filterByDiets(e.target.value));
    setFilterValues((prevValues) => ({
      ...prevValues,
      filterByDiets: e.target.value
    }));
    returnToFirstPage();
  }

// ordenar las recetas por nombre
function handleOrderByName(e) {
    dispatch(orderByName(e.target.value));
    setFilterValues((prevValues) => ({
      ...prevValues,
      orderByName: e.target.value
    }));
    setrecipeBook(prevBook => !prevBook);
    returnToFirstPage();
  }

//  ordenar las recetas por puntaje de salud
function handleOrderByScore(e) {
    dispatch(orderByScore(e.target.value));
    setFilterValues((prevValues) => ({
      ...prevValues,
      orderByScore: e.target.value
    }));
    setrecipeBook(prevBook => !prevBook);
    returnToFirstPage();
  }

 // filtrar las recetas según la fuente (API o Base de Datos)
 function handlefilteredRecipes(e) {
    dispatch(filteredRecipes(e.target.value));
    setFilterValues((prevValues) => ({
      ...prevValues,
      filteredRecipes: e.target.value
    }));
    returnToFirstPage();
  }

// Función para refrescar las recetas y volver a la primera página
function handleRefresh() {
    dispatch(getRecipes());
    setCurrentPage(1);
    setFilterValues({
      orderByName: "default",
      orderByScore: "default",
      filterByDiets: "default",
      filteredRecipes: "default"
    });
  }

    return (
        <div className={style.home}>
            <div className={style.selectContainer}>
            <SearchBar returnToFirstPage={returnToFirstPage} /> 
            <button><NavLink to='/home' >Home</NavLink> </button>
            <button><NavLink to='/create' >Create your own recipe! </NavLink> </button>
            <button onClick={handleRefresh} >Bring All</button>
                <select onChange={e => handleOrderByName(e)}   value={filterValues.orderByName} className={style.filters}>
                    {/* Filtros para ordenar las recetas alfabeticamente */}
                    <option value="default">Alphabetical order</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                   {/* Filtro para seleccionar por puntaje saludable */}
                <select onChange={e => handleOrderByScore(e)}   value={filterValues.orderByScore} className={style.filters}>
                    <option value="default" >Order by score</option>
                    <option value="desc">Higher</option>
                    <option value="asc">Lower</option>
                </select>
                {/* Filtro para seleccionar por tipo de dieta */}
                <select onChange={e => handleFilterByDiets(e)} value={filterValues.filterByDiets} className={style.filters}>
                    <option value="default" >Filter by diets</option>
                    {
                        diets && diets.map((diet) => (
                            <option value={diet.name} key={diet.id}>{diet.name}</option>
                        )) 
                    }
                </select>
                {/* Filtro para seleccionar por fuente de recetas (Api o Data Base) */}
                <select onChange={e => handlefilteredRecipes(e)} value={filterValues.filteredRecipes} className={style.filters}>
                    <option value="default" disabled >Filter by source</option>
                    <option value="Api">Api</option>
                    <option value="DataBase">Data Base</option>
                </select>
            </div>
            <div>
                 {/* Componente Paginado para navegar entre las páginas de recetas */}
                <Paginado
                    recipesPerPage={recipesPerPage}
                    recipes={recipes?.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <div className={style.cardsGrid}>
                     {/* Renderiza las recetas actuales en tarjetas */}
                    {currentRecipes && currentRecipes.map(el => {
                            return (
                                <Card img={el.image} name={el.name} diets={el.diets} id={el.id} key={el.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};