const authenticate = async (req, res, next) => {
    console.log("PROTECT PROTECT PROTECT PROTECT PROTECT PROTECT ")
    if (!req.session.authenticated || !req.session.user) {
        const err = new Error('You shall not pass');
        err.statusCode = 401;
        next(err);
    }
    next();
}

module.exports = authenticate;