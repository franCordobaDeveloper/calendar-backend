const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "El nombre completo es obligatorio"],
            minLength: [3, "El nombre debe tener al menos 3 caracteres."],
            maxLength: [100, 'El nombre no puede exceder 100 caracteres']
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            validate: {
                validator: function(email) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
                },
                message: 'Por favor ingresa un email válido'
            }
        },
         password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minLength: [6, 'La contraseña debe tener al menos 6 caracteres']
        },

    }
)

module.exports = model('Usuario', UsuarioSchema);