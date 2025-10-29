const { Schema, model } = require("mongoose");

const EventoSchema = new Schema({

    title: {
        type: String,
        required: true,
        minLength: [3, "El titulo debe tener al menos 3 caracteres."],
        maxLength: [50, 'El titulo no puede exceder 50 caracteres']
    },
    notes: {
        type: String,
        maxLength: [500, 'Las notas no pueden exceder 500 caracteres']
    },
    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, "El usuario es obligatorio"]
    }

});

EventoSchema.method('toJSON', function() {
    const {__v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
})

module.exports = model('Evento', EventoSchema);