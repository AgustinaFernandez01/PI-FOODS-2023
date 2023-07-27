import { FILTERED_RECIPES, GET_RECIPES, GET_DIETS, FILTER_BY_DIETS, ORDER_BY_NAME, SEARCH_BY_NAME, ORDER_BY_SCORE, RECIPE_DETAIL, POST_RECIPE } from "./actions";

const initialState = {
    recipes: [],// Almacena todas las recetas obtenidas del servidor
    recipesCopy: [],// Copia de las recetas originales, se utiliza para aplicar filtros sin perder los datos originales
    diets: [], // Almacena todos los tipos de dietas obtenidos del servidor
    detail: []   // Almacena los detalles de una receta en particular
}

const rootReducer =  function (state = initialState, {type, payload}) {
    switch (type) {
        case GET_RECIPES:
            
            return {
                ...state,
                recipes: payload,
                recipesCopy: payload
            }  
        case GET_DIETS:
            return {
                ...state,
                diets: payload // Actualiza el estado "diets" con los tipos de dietas obtenidos del servidor
            }
            case FILTER_BY_DIETS: 
            if (payload === 'all') {
              return {
                ...state
              }    
            } else { 
                let filteredRecipes = [];
                state.recipesCopy.forEach(recipe => {
                    if(recipe.diets.includes(payload)) {
                        filteredRecipes.push(recipe)
                    } 
                    else if(recipe.lowFodmap && payload === "lowFodmap") {
                        filteredRecipes.push(recipe)
                    } else if(recipe.vegetarian && payload === 'vegetarian'){
                        filteredRecipes.push(recipe)
                    }  else if(typeof recipe.diets[0] !== 'string'){
                        recipe.diets.forEach(d => {
                            if(d.name === payload){
                                filteredRecipes.push(recipe)
                            }}
                        )} 
                    }) 
                    return {
                        ...state,
                        recipes: filteredRecipes
                        }
                    }
        case ORDER_BY_NAME:
            const recipesSorted = payload === 'asc' ?
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) :
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
            return {
                ...state,
                recipes: recipesSorted // Ordena las recetas por nombre (asc o desc) y actualiza el estado "recipes"
            }
        case ORDER_BY_SCORE:
            const recipesByScore = payload === 'asc' ?
                state.recipes.sort((a, b) => {
                    if (a.healthScore > b.healthScore) return 1;
                    if (b.healthScore > a.healthScore) return -1;
                    return 0;
                }) :
                state.recipes.sort((a, b) => {
                    if (a.healthScore > b.healthScore) return -1;
                    if (b.healthScore > a.healthScore) return 1;
                    return 0;
                });
            return {
                ...state,
                recipes: recipesByScore // Ordena las recetas por puntaje de salud (ascendente o descendente) y actualiza el estado "recipes"
            }

        case SEARCH_BY_NAME:
            return {
                ...state,
                recipes: payload  // Actualiza el estado "recipes" con las recetas filtradas por el nombre de búsqueda
            };
        case POST_RECIPE:
            return {
                ...state
            }
        case RECIPE_DETAIL:
            return {
                ...state,
                detail: payload // Actualiza el estado "detail" con los detalles de la receta seleccionada
            }
            case FILTERED_RECIPES:
            if (payload === "Api") {
                 const getApi = state.recipesCopy.filter((recipe) => typeof recipe.id === "number");
                    return {
                    ...state,
                    recipes: getApi, // Asigna el resultado filtrado al estado "recipes"
                           }
                    }
            if (payload === "DataBase") {
                 const getDb = state.recipesCopy.filter((recipe) => typeof recipe.id === "string");
                    return {
                    ...state,
                    recipes: getDb, // Asigna el resultado filtrado al estado "recipes"
                            }
                    } else {
                        return {
                        ...state,
                        recipes: state.recipesCopy, 
                                }
            }
        default: return {...state}
    }
};


export default rootReducer; 