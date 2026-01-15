function errorHandler(err, req, res, next) {
    console.error(err.message);

    let statusCode = 500;

    if (err.message.includes('Invalid') || err.message.includes('required')) {
        statusCode = 400;
    } else if (err.message.includes('not found')) {
        statusCode = 404;
    } else if (err.message.includes('exists')) {
        statusCode = 409;
    }

    res.status(statusCode).json({
        error: err.message
    });
}

module.exports = errorHandler;
