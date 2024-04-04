const db = require('../connector');

const getUser = async (userID) => {
    const doc = await db.collection('users').doc(userID).get();

    if (doc.exists) return doc;
    else return false;
}

module.exports = getUser;