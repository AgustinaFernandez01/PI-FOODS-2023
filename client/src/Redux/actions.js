import axios from 'axios';

// action types
export const FILTERED_RECIPES = "FILTERED_RECIPES";
export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const POST_RECIPE = 'POST_RECIPE';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const RECIPE_DETAIL = 'RECIPE_DETAIL';

// Acción para obtener todas las recetas desde el servidor
export const getRecipes = () => {
    return async function (dispatch) {
      try {
        let json = await axios.get('http://localhost:3001/recipes');
        return dispatch({ type: GET_RECIPES, payload: json.data });
      } catch (error) {
        return dispatch({ type: GET_RECIPES, payload: [] }); 
      }
    }
  };

// Acción para obtener todos los tipos de dietas disponibles desde el servidor
export const getDiets = () => {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/diets');
        return dispatch({ type: GET_DIETS, payload: json.data })
    }
};

// Acción para filtrar las recetas por un tipo de dieta específico
export const filterByDiets = (payload) => {
    return {
        type: FILTER_BY_DIETS,
        payload
    }
};

// Acción para ordenar las recetas por nombre
export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

// Acción para ordenar las recetas por puntaje de salud
export const orderByScore = (payload) => {
    return {
        type: ORDER_BY_SCORE,
        payload
    }
};

// Acción para buscar recetas por su nombre
export const  searchByName = (name) => {
    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
        return dispatch({ type: SEARCH_BY_NAME, payload: json.data })
    }
};

// Acción para crear una nueva receta
export const postRecipe = (payload) => {
    return async function(){
    try{
        let json = await axios.post('http://localhost:3001/recipes', payload)
        alert('Recipe created successfully!');
        return json
    } catch(e){
        alert("The recipe could not be created");
    }   
    }
};

// Acción para obtener los detalles de una receta en particular por su ID
export const recipeDetail = async (id, setRecipe) => {
        let {data} = await axios.get(`http://localhost:3001/recipes/${id}`)
        setRecipe(data)
};

// Acción para aplicar un filtro personalizado a las recetas
export const filteredRecipes = (filter) => {
    return{
        type: FILTERED_RECIPES,
        payload: filter
    }
};
