// OBTENER METODO RUTA DE EXPRESS
const { Router } = require('express');
//CONTROLADORES
const { obtenerPlataformas,
    obtenerPlataforma,
    obtenerPlataformaNombre,
    agregarPlataforma,
    editarPlataforma,
    eliminarPlataforma } = require('../controllers/plataformas.controllers');

//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenTrue } = require('../middlewares/auth');
const { validadorPlataformas } = require('../validators/plataformas.validators');
//INSTANCIA DEL ROUTER EXPRESS
const router = Router();
//RUTAS DE PLATAFORMA
router.get('/', obtenerPlataformas);
router.post('/', [TokenTrue, validadorPlataformas], agregarPlataforma);
router.get('/nombre/:name', obtenerPlataformaNombre);
router.get('/:id', obtenerPlataforma);
router.put('/:id',TokenTrue, editarPlataforma);
router.delete('/:id',TokenTrue, eliminarPlataforma);

//EXPORTAR RUTA PARA EL INDEX.JS
module.exports = router;