const client = require("../db/redis");
const session = require("express-session");
const connectRedis = require('connect-redis');
let RedisStore = connectRedis(session);
const store = new session.MemoryStore()

module.exports = session({
    // store: new RedisStore({ client: client }),
    store,
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: false,
    name: 'sessionId',
    cookie: {
        secure: false,
        httpOnly: true, // if true: prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 30, // session max age in milliseconds
        // explicitly set cookie to lax
        // to make sure that all cookies accept it
        // you should never use none anyway
        sameSite: 'lax',
    }
});
