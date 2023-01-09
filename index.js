const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require("cors");

app.use(cors())
app.use(express.json());
const io = require("socket.io")(server/* , {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    },
} */);

io.on("connection", socket => {

    console.log("User Connected", socket.id);
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit("chat message", msg);
    });
});

// app.get('/', (req, res) => {
//     res.send('<h1>Socket Server</h1>');
// });
app.get("/", (req, res)=> {
    res.send({
        status: 200,
        message: "Backend is working"
    })
})

server.listen(5000, () => console.log("Server Running on port 5000"));