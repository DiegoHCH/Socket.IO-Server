const { io } = require('../index');

//Sockets Messages
io.on('connection', client => {
    console.log('Cliente Conectado')
    client.on('disconnect', () => {console.log('Cliente Desconectado')});

    client.on('message', (payload) => {
        console.log('Message!!!', payload.nombre);

        io.emit('message', {admin: 'Nuevo Mensaje'});
    })
});