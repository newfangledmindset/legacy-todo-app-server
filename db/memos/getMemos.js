const db = require('../connector');

const getMemos = async (userID) => {
    const doc = await db.collection('memos').doc(userID).collection('memos').get();

    return doc;
}

module.exports = getMemos;