const Server = require("./core/server");


const server = new Server();

server.start()
    .then(() => console.log("Servidor iniciado correctamente"))
    .catch((error) => {
        console.error("Error al iniciar el servidor")
    });