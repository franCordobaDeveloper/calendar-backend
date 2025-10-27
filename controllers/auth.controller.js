const { response, request } = require("express");
const { validationResult } = require("express-validator");


const crearUsuario = (req = request, res = response) => {
    
    const { fullName, email, password } = req.body;

    // Manejo de errores

    res.status(201).json({
        ok: true,
        msg: "registro",
        fullName,
        email,
        password  
    });
}

const loginUsuario = (req, res = response) => {
    
    const { email, password } = req.body

    // Manejo de errores
    
    
    res.status(200).json({
        ok: true,
        msg: "login",
        email,
        password
    })
}

const revalidarToken = (req, res= response) => {
    res.json({
        ok: true,
        msg: "renew",
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}