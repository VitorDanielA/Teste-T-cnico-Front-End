const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        METHODS: ['GET', 'POST'],
    }});

const PORT = 3001

io.on('connection', socket => {
    console.log("Usuário connectado", socket.id);

    socket.on('set_username', login => {
        socket.data.login = login;
        console.log(socket.data.login);
    })

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
    });

    socket.on('disconnect', reason => {
        console.log('Usuário desconectado', socket.id)
    })

    socket.on('message', text => {
        io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.login
        })
    })

})

server.listen(PORT, () => console.log("Server running...."))