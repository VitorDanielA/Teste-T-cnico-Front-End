const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        METHODS: ['GET', 'POST'],
    }});

const PORT = 3001

io.on('connection', socket => {
    console.log("Usuário connectado", socket.id);

    socket.on('set_username', login => {
        socket.data.login = login;
        console.log(socket.data.login);
    })

    socket.on('disconnect', reason => {
        console.log('Usuário desconectado', socket.id)
    })

})

server.listen(PORT, () => console.log("Server running...."))