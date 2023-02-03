const authenticate = async (req, res, next) => {
    console.log(req.body);
    console.log(req.session);
    const {withCredentials} = req.body
    if (withCredentials){
        console.log("print session")
        console.log(req.session);
    }
    if (!req.session || !req.session.user) {
        const err = new Error('You shall not pass');
        err.statusCode = 401;
        next(err);
    }
    next();
}

module.exports = authenticate;