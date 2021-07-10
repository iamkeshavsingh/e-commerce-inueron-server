const { verifyToken } = require('../utils/jwt.util')

function authMiddleware(req, res, next) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.split(' ')[1]
        if (token) {
            verifyToken(token)
                .then(decodedToken => {
                    req.user = decodedToken;
                    next();
                })
                .catch(err => {
                    // User not valid
                    return res.json({
                        success: false,
                        msg: 'Not authorized'
                    })
                })
        }
        // User not Valid
        return res.json({
            success: false,
            msg: 'Not authorized'
        })
    }

    // User Not Valid
    return res.json({
        success: false,
        msg: 'Not authorized'
    })
}


module.exports = authMiddleware