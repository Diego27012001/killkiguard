import { Server } from 'socket.io'

export const configureSocketServer = (server) => {
    const io = new Server(server);

    // Lógica para manejar la conexión de nuevos clientes
    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        // Lógica para manejar el evento "nuevoMensaje" enviado por el cliente
        socket.on('nuevoMensaje', (data) => {
            console.log('Mensaje recibido:', data);

            // Envía una señal a todos los clientes conectados para actualizar la interfaz
            io.emit('mensajeRecibido', data);
        });

        // Lógica para manejar la desconexión de clientes
        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};

module.exports = configureSocketServer;