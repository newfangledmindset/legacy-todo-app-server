const db = require('../connector');

const createUser = async (userObj) => {
    try {
        await db.collection('users').doc(userObj.id).set(userObj);
        return userObj;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = createUser;