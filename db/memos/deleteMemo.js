const db = require('../connector');

const deleteMemo = async (userID, memoID) => {
    const doc = db.collection('memos').doc(userID).collection('memos').doc(memoID);

    try {
        const res = await doc.delete({ exists: true});
        return res;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = deleteMemo;