const { Diet, Recipe } = require("../db");
const axios = require('axios');
const {API_KEY} = process.env

 
const get_ApiID = async (id) => {
 // Realizar una solicitud a la API para obtener los detalles de la receta por su ID
    const apiID = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    const detail = apiID.data;

// Crear un objeto con los detalles de la receta para retornarlos
    let recipeDetail = {
        id,
        name: detail.title,
        summary: detail.summary,
        healthScore: detail.healthScore,
        image: detail.image,
        steps: detail.analyzedInstructions[0]?.steps.map(s => {
            return {
                number: s.number,
                step: s.step,
            }
        }),
        diets: detail.diets,
    }
    return recipeDetail;
}

// obtener los detalles de una receta desde la base de datos por su ID
const get_DataBaseID = async (id) => {
// El método "findByPk" devuelve la receta cuyo ID coincide 
    return await Recipe.findByPk(id, {
// Utiliza la opción "include" para incluir la asociación con el modelo "Diet"
        include: {
// El modelo "Diet" se especifica aquí para indicar la asociación que se desea incluir
            model: Diet,
// La opción "attributes" se utiliza para especificar qué atributos del modelo "Diet" 
            attributes: ['name'],
// La opción "through" se utiliza para especificar qué atributos de la tabla intermedia
            through: {
                attributes: [],
            }
        }
    })
}

// obtener recetas desde la API externa
const get_Api = async () => {
    const resApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const { results } = resApi.data;

    const infoApi = await results?.map((r) => {
        return {
            id: r.id,
            name: r.title,
            summary: r.summary,
            healthScore: r.healthScore,
            image: r.image,
            steps: r.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step,
                }
            }),
            diets: r.diets, 
            vegetarian: r.vegetarian,
            lowFodmap: r.lowFodmap
        }
    })
    return infoApi;
};

// obtener recetas desde la base de datos
const get_DataBase = async () => {
// La función "findAll" devuelve todas las instancias del modelo "Recipe" en la base de datos
    return await Recipe.findAll({
        include: {
 // Utiliza la opción "include" para incluir la asociación con el modelo "Diet"
            model: Diet,
// La opción "attributes" se utiliza para especificar qué atributos del modelo "Diet" 
            attributes: ['name'],
 // La opción "through" se utiliza para especificar qué atributos de la tabla intermedia 
            through: {
                attributes: [],
            }
        }
    });
}

// todas las recetas combinando las obtenidas de la API y la base de datos
const get_AllRecipes = async () => {
    const getApi = await get_Api();
    const getDataBase = await get_DataBase();
    const all = [...getApi, ...getDataBase];
    return all;
}

module.exports = { 
    get_AllRecipes,
    get_DataBase,
    get_Api,
    get_DataBaseID,
    get_ApiID,
}