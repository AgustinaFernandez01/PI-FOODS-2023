const { get_DataBaseID, get_ApiID } = require('../controllers/getRecipesController');

// GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
const detailByIdHandler = async (req, res, next) => {
 // Obtener el ID de la receta de los parámetros de la URL
    const { id } = req.params;
    let validate = id.includes("-"); // Si tiene el guion es pq se encuentra en base de datos.
    try {
        if (validate) {
  // Si la receta está en la base de datos, obtener sus detalles utilizando la función get_DataBaseID
            let recipeDB = await get_DataBaseID(id);
// Enviar la respuesta con los detalles de la receta desde la base de datos
            return res.status(200).send(recipeDB);
        } else { // Se encuentra en la API
            let recipeAPI = await get_ApiID(id);
            return res.status(200).send(recipeAPI);
        }
    } catch (err) {
// Enviar una respuesta de error con un mensaje adecuado
    res.status(500).send({ message: "Recipe detail not found" });
    }
}

module.exports = detailByIdHandler; 



