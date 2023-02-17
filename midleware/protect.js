const {verifyToken} = require("../controllers/authController")
const authenticate = async (req, res, next) => {
    console.log("******************        PROTECT PROTECT PROTECT PROTECT PROTECT PROTECT ");
    if (/* !req.session.authenticated || */ 
        /* !req.session.user || */ 
        req.body.sessionToken != req.session.token ||
        req.body.user._id != req.session.user._id
        ) {
            
        const err = new Error('You shall not pass');
        err.statusCode = 401;
        next(err);
    }
    next();
}

module.exports = authenticate;
// "sessionToken": "" 