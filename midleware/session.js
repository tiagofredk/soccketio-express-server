// const session = require("express-session");
// const connectRedis = require("connect-redis");
const client = require("../db/redis")

// const RedisStore = connectRedis(session)

// module.exports = session({
//     store: new RedisStore({ client: client }),
//     saveUninitialized: false,
//     resave: false,
//     name: "sessionId",
//     cookie: {
//         secure: false,
//         httpOnly: true, // if true: prevents client side JS from reading the cookie
//         maxAge: 1000 * 60 * 30, // session max age in milliseconds
//         // explicitly set cookie to lax
//         // to make sure that all cookies accept it
//         // you should never use none anyway
//         sameSite: 'lax',
//     }
// })

const session = require("express-session")
let RedisStore = require("connect-redis")(session)

module.exports = session({
    store: new RedisStore({ client: client }),
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true, // if true: prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 30, // session max age in milliseconds
        // explicitly set cookie to lax
        // to make sure that all cookies accept it
        // you should never use none anyway
        sameSite: 'lax',
    }
})
