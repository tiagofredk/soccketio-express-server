const {verifyToken} = require("../controllers/authController")
const authenticate = async (req, res, next) => {
    console.log("******************        PROTECT PROTECT PROTECT PROTECT PROTECT PROTECT ");
    // console.log("******************        req.session req.session req.session req.session req.session req.session req.session");
    // console.log(req.session);
    // console.log("******************        req.body req.body req.body req.body req.body req.body req.body req.body")
    // console.log(req.body);
    if (!req.session.authenticated || 
        !req.session.user || 
        req.body.sessionToken != req.session.token) {
            
        const err = new Error('You shall not pass');
        err.statusCode = 401;
        next(err);
    }
    next();
}

module.exports = authenticate;
// "sessionToken": "" 