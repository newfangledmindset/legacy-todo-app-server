const bcrypt = require('bcrypt');

const db = require('../connector');
const getUser = require('./getUser');

const validateUser = async (userID, password) => {
    const doc = await getUser(userID);

    const isValidPassword = await bcrypt.compare(password, doc.data()['password']);

    if (doc.exists && isValidPassword) return doc;
    else return false;
}

module.exports = validateUser;