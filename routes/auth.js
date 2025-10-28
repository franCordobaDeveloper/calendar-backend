/*
    Rutas de Usuarios / Auth
    host + /api/auth

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



router.post(
    '/new', 
    [
        // middlewares
        check("fullName", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "La contraseña debe de ser de 6 caracteres.").isLength({ min: 6}),
        check("password", "La contraseña es obligatoria.").not().isEmpty(),
        validarCampos
    ] ,
    crearUsuario
);


router.post(
    '/', 
    [
        // middlewares
        check("email", "El email es obligatorio").isEmail(),
        check("password", "La contraseña debe de ser de 6 caracteres.").isLength({ min: 6}),
        check("password", "La contraseña es obligatoria.").not().isEmpty(),
        validarCampos
    ],
    loginUsuario
)
   

router.get('/renew', validarJWT ,revalidarToken );



module.exports = router;