const express = require('express');
const app = express();
const cors = require("cors");
const router = require('./routes/routes');
const DBConnect = require('./db/dbConnection');
// const socketServer = require('./db/socketServer');
const http = require('http');
const server = http.createServer(app);
const session = require("./midleware/session");

require("dotenv").config();
app.use(cors())
app.use(express.json());

DBConnect();

// socketServer();

app.use(session);
app.use(router);

const PORT = 5002
server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));