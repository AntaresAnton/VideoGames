// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { agregarUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerTodo,
    obtenerUnoSolo } = require('./../controllers/usuario.controller');
const { TokenValido } = require('./../middlewares/auth');
const { validadorUsuario } = require('./../validators/usuario.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//  METODOS DE NUESTRA RUTA
router.get('/', TokenValido, obtenerTodo);
router.get('/:id', TokenValido, obtenerUnoSolo);
router.post('/', [validadorUsuario], agregarUsuario);
router.put('/:id', TokenValido, editarUsuario);
router.delete('/:id', TokenValido, eliminarUsuario);
//  EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;