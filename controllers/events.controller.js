const { response, request } = require("express");
const Evento = require("../models/Evento");

// const { generarJWT } = require("../helpers/jwt");


const getEventos = async (req = request, res = response) => {
    
    const eventos = await Evento.find()
                                .populate('user', 'fullName');

    return res.status(200).json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req= request, res = response) => {
    
    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save()
        res.json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin."
        });
    }
    
}

const actualizarEvento = async (req= request, res = response) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById(eventoId);

        if( !evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe por el ID propocionado"
            });
        }

        if( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de actualiar este evento."
            });

        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin." 
        });
    }
    
    return res.status(201).json({
        ok: true,
        msg: "Evento actualizado."
    })
}

const eliminarEvento = async (req= request, res = response) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if( !evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe por el ID propocionado"
            });
        }

        if( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de eliminar este evento este evento."
            });

        }

        const eventoEliminado = await Evento.findByIdAndDelete(evento)
        
        res.json({
            ok: true,
            msg: "Evento eliminado",
            eventoEliminado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
    
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}