const { Diet } = require("../db");
const { types } = require("../controllers/dietsTypesController")
// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar 
// la base de datos con los tipos de datos indicados por spoonacular.
const dietsTypesHandler = async(req, res) => {
    try {
// Iterar a través de los tipos de dieta precargados desde la variable "types"
// y asegurarse de que estén presentes en la base de datos utilizando "findOrCreate"
        types.forEach(async n => {
           await Diet.findOrCreate({
                where: {
                    name: n
                }
            })
        });
// Obtener todos los tipos de dieta presentes en la base de datos después de la precarga
        const diets = await Diet.findAll();
        res.send(diets);
    } catch (err) {
        res.status(500).send({ message: "Diets not found" });
    }
  };

module.exports = dietsTypesHandler;


