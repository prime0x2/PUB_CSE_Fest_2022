export const errorLogger = (err, req, res, next) => {
    console.log(err);

    res.status(err.status || 500);
    res.json({
        status: res.statusCode || 500,
        message: err.message,
        // route: req.originalUrl,
        // timestamps: new Date().toLocaleString(),
    });
};