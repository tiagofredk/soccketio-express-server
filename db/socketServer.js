const app = require("express");
const http = require('http');
const server = http.createServer(app);

const socketServer = async () => {
    const io = require("socket.io")(server, {
        cors: {
            origin: ["http://localhost:3000"],
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", socket => {
        // console.log(socket)
        console.log("User Connected", socket.id);
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit("chat message", msg);
        });
    });
    console.log("socket.io Server connected");
}

module.exports = socketServer;