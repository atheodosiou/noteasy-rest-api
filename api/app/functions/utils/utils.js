function errorHandler(req, res, next, error) {
    res.status(error.status || 500).json({ error: error });
}

module.exports = {
    errorHandler
}