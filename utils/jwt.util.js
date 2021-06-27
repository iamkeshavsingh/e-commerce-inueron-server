require('dotenv').config();
const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY;


// jwt.sign({
//     username: 'iamkeshav',
//     isAdmin: false
// }, privateKey, function (err, token) {
//     if (err) throw err;
//     console.log(token);
// });


// jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlhbWtlc2hhdiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNDc3NDg5M30.D_0SLnZTtzWVGMql88nUpiSrZC8CrG-XTwt9Ow8pvwk', privateKey, function (err, decodedToken) {
//     if (err) throw err;
//     console.log(decodedToken);
// })