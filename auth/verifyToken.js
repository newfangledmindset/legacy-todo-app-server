const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig.json');

const verifyToken = (token) => {
    try {
        const user = jwt.verify(token, jwtConfig.JWT_SECRET);
        return user;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};

module.exports = verifyToken;