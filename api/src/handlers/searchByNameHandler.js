const { get_AllRecipes } = require('../controllers/getRecipesController');

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
const searchByNameHandler = async (req, res, next) => {
// Obtener el parámetro de consulta "name" del query string de la URL
    const { name } = req.query;
     
    try {
 // Obtener todas las recetas mediante la función get_AllRecipes
        let AllRecipes = await get_AllRecipes({name});

        if (name) {
 // Si el parámetro "name" existe, filtrar las recetas que contienen la palabra buscada 
            let recipeByName = AllRecipes.filter(r => r.name.toLowerCase().includes(name.toString().toLowerCase())); // Utilizo LowerCase para evitar problemas con la comparación.
            if(recipeByName.length) {
// Si se encuentran recetas con el nombre buscado, mapearlas para enviar solo los datos necesarios
                let recipes = recipeByName.map(r => {
                    return { 
                        id: r.id,
                        name: r.name,
                        summary: r.summary,
                        healthScore: r.healthScore,
                        image: r.image,
                        steps: r.steps,
                        diets: r.diets ? r.diets : r.diets.map(r => r.name)
                    }
                })
                return res.status(200).send(recipes);
            }
            return res.status(400).send('Recipe not found.');
        } else {
            // Si no tengo nombre, devuelvo todas las recetas.
            let recipes = AllRecipes.map(r => {
                return { 
                    id: r.id,
                    name: r.name,
                    summary: r.summary,
                    healthScore: r.healthScore,
                    image: r.image,
                    steps: r.steps,
                    diets: r.diets ? r.diets : r.diets.map(r => r.name),
                    vegetarian: r.vegetarian,
                    lowFodmap: r.lowFodmap
                }
            })
       
            return res.status(200).send(recipes)
        }

    } catch (err) {
        res.status(500).send({ message: "Recipes not found" });
}}

module.exports = searchByNameHandler;
