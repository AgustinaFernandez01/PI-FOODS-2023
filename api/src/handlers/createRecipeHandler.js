const { Recipe, Diet } = require('../db');
const { types } = require("../controllers/dietsTypesController");

// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos    
const createRecipeHandler = async (req, res) => {
// Extraer los datos del cuerpo de la solicitud (req.body)
    const { name, summary, healthScore, image, stepByStep, diets } = req.body;
    try {
        const newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            image,
            steps: stepByStep,
        })
// Buscar en la base de datos las dietas relacionadas con las dietas recibidas en la solicitud (diets)
      
let dietDB = await Diet.findAll({
            where: {
                name: diets
            }
        })  
     
        newRecipe.addDiet(dietDB);
        res.status(200).send(newRecipe);

    } catch (err) {
        res.status(500).send({ message: "The recipe could not be created" });
    }
  };

module.exports = createRecipeHandler;



