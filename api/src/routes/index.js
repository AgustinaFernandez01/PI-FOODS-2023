const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createRecipeHandler = require('../handlers/createRecipeHandler');
const searchByNameHandler = require('../handlers/searchByNameHandler');
const detailByIdHandler = require('../handlers/detailRecipeByIdHandler');
const dietsTypesHandler = require('../handlers/dietsTypesHandler');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();

//POST
router.post('/recipes', createRecipeHandler);
//GETS
router.get('/recipes', searchByNameHandler)

router.get('/recipes/:id', detailByIdHandler)

router.get('/diets', dietsTypesHandler); 



module.exports = router;
