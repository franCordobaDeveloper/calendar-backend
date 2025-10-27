const express = require('express');
const { dbConnection } = require('../database/config');
require('dotenv').config();
// const cors = require('cors'); // Te recomiendo agregar CORS

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3002'; 
        
        // Conectar a la base de datos
        this.conectarDb();

        // Middlewares
        this.configureMiddlewares();

        // Rutas de aplicacion
        this.routes();
    }

    // Middlewares
    configureMiddlewares() {
        // this.app.use(cors()); // ← DESCOMENTAR si quieres usar CORS
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'));
    }
    
    // Rutas de la aplicacion
    routes() {
        
        this.app.use('/api/auth', require('../routes/auth')); 
    }

    // conexion a la base de datos
    async conectarDb() {
        await dbConnection();
    }

    start() {
        return new Promise((resolve, reject) => {
            this.app.listen(this.port, () => {
                console.log(`Servidor corriendo el puerto: ${this.port}`);
                resolve();
            }).on('error', reject);
        });
    }
    
    // Obtener instancia de express (Para los test)
    getApp() {
        return this.app;
    }
}

module.exports = Server;