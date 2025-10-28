const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");


const crearUsuario = async (req = request, res = response) => {
    
    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: "Un usario existe con ese email."
            })
        }

        usuario = new Usuario( req.body );

        // Encriptar password
        const salt = bcrypt.genSaltSync(10);
        usuario.password= bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.fullName);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            fullName: usuario.fullName,
            token
        });

   } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin."
        })
   }
}

const loginUsuario = async (req, res = response) => {
    
    const { email, password } = req.body

    try {
        
        const usuario = await Usuario.findOne({email});
        
        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con el email y/o password proporcionado."
            })
        }
        // Confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "passoword incorrecto"
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.fullName);

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            fullName: usuario.fullName,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin."
        })
    }
   
}

const revalidarToken = async (req, res= response) => {
    
    const { uid, fullName } = req;
    
    // Generar un nuevo jwt y retornarlo en la peticion
    const nuevoToken = await generarJWT(uid, fullName);

    res.json({
        ok: true,
        msg: "renew",
        nuevoToken
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}