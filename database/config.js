const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Base de datos conectada correctamente');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión a la base de datos');
    }
}

module.exports = {
    dbConnection
};