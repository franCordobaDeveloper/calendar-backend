/*
    Rutas
    /api/events

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use( validarJWT );

// Obtener Eventos

router.get("/" ,getEventos);

router.post(
    "/", 
    [
      check("title", "El titulo es obligatorio").not().isEmpty(),
      check("start", "Fecha de inicio es obligatoria").custom( isDate ),
      check("end", "La fecha de finalizacion es obligatoria").custom( isDate ),
      validarCampos
    ],
    crearEvento);

router.put("/:id", actualizarEvento)

router.delete("/:id", eliminarEvento);

module.exports = router;