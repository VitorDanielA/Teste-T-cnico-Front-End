const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        METHODS: ['GET', 'POST'],
    }});

const PORT = 3001

var users = [];

async function fazerLogin() {
    try {
        const response = await fetch("http://localhost:5000/usuarios");
        const data = await response.json();
        users = data.map(user => ({ ...user, socketId: null })); 
    } catch (error) {
        console.log('Erro ao buscar dados:', error);
    }
}

fazerLogin();

/**
 * @typedef {Object} RoomUser
 * @property {string} socket_id - O ID do socket do usuário.
 * @property {string} username - O nome de usuário do usuário.
 * @property {string} room - A sala à qual o usuário está conectado.
 */

/** @type {RoomUser[]} */
const user = [{
    
}];

/**
 * @typedef {Object} Message
 * @property {string} salaMsg - O ID do socket do usuário.
 * @property {string} username - O nome de usuário do usuário.
 * @property {string} mensagem - A sala à qual o usuário está conectado.
 * @property {Date} data - A sala à qual o usuário está conectado.
 */


const messagesChat = []

io.on('connection', socket => {

    console.log("Usuário connectado", socket.id);

    socket.on("select_room", (data) =>{
        console.log(data);

        socket.join(data.sala);

        const userInRoom = user.find((usuario) => usuario.username === data.login && usuario.room === data.sala)

        if(userInRoom){
            userInRoom.socket_id = socket.id;
        } else{
            user.push({
                room: data.sala,
                username: data.login,
                socket_id: socket.id
            })
        }
    })

    socket.on("message", (message, sala, user) => {
        /** @type {Message[]} */
        var messages = {
            salaMsg: sala,
            username: user,
            mensagem: message,
            data: new Date(),
        };
        
        messagesChat.push(messages);
        io.to(messages.salaMsg).emit("message", messages)
    })

})

server.listen(PORT, () => console.log("Server running...."))