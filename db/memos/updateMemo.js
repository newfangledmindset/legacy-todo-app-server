const db = require('../connector');

const updateMemo = async (userID, memoID = null, memoObj) => {
    const collection = db.collection('memos').doc(userID).collection('memos');

    if (memoID) { // Update
        console.log(true)
        try {
            const doc = await collection.doc(memoID).get();
            if (doc.exists) {
                await collection.doc(memoID).update(memoObj);
                return true;
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    else { // Create
        console.log(false)
        try {
            await collection.add(memoObj);
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
}

module.exports = updateMemo;