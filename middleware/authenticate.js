const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).send("Please Login")
    }
    const authToken = req.headers.authorization.split(' ')[1];
    jwt.verify(authToken, process.env.jwt_key, (err, decoded) => {
        if(err) {
            return res.status(401).send("Invalid auth token");
        }
        else {
            req.user = decoded;
            next();
        }
    })
}

module.exports = authenticate;