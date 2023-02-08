require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const router = require('./routes/routes');
const DBConnect = require('./db/dbConnection');
// const socketServer = require('./db/socketServer');
const http = require('http');
const server = http.createServer(app);
const session = require("./midleware/session");

app.use(session);

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());

DBConnect();

// socketServer();

app.use(router);

const PORT = 5002
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));