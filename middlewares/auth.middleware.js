const { verifyToken } = require('../utils/jwt.util')

function authMiddleware(req, res, next) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.split(' ')[1]
        if (token) {
            return verifyToken(token)
                .then(decodedToken => {
                    req.user = decodedToken;
                    next();
                })
                .catch(err => {
                    res.status(401).json({
                        success: false,
                        msg: 'Not authorized'
                    })
                })
        }
    }

    // User Not Valid
    return res.status(401).json({
        success: false,
        msg: 'Not authorized'
    })
}


module.exports = authMiddleware