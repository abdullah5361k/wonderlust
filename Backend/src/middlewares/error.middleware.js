const multer = require("multer");
const errorMiddleware = (err, req, res, next) => {

    if (err instanceof multer.MulterError) {
        err.statusCode = 413;
        err.message = "Image is too large, max size is 2mb"
    }

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong!"

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
}

module.exports = errorMiddleware;