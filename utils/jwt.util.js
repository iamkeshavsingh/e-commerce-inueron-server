const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY;


const getToken = function (data) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, privateKey, function (err, token) {
            if (err) return reject(err);
            resolve(token);
        });
    })
}

const verifyToken = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, function (err, decodedToken) {
            if (err) return reject(err);
            resolve(decodedToken);
        })
    })
}

exports.getToken = getToken;
exports.verifyToken = verifyToken;