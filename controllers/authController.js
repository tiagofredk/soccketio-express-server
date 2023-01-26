const ErrorResponse = require("../utils/errorResponse");
const {User} = require("../schemas/schemas");

const login = async (req, res, next) => {
    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
        // Check that user exists by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        // Check that password match
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
}

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password
        });
        sendToken(user, 200, res);
    } catch (error) {
        next(error)
    }
}

const sendToken = (user, statusCode, res) => {
    const token = User.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
};

module.exports = {
    login,
    register
}