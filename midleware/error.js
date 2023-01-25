const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {
    let error = {...err};

    if (err.code === 11000) {
        const message = "duplicate field value entered"
        error = new ErrorResponse(message, 400)
    }

    if (err.name === "validationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    console.log(error.message);

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server Error",
    });
};

module.exports = errorHandler;