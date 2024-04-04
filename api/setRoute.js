const { FieldValue } = require('firebase-admin/firestore');

const { updateMemo } = require('../db/memos');
const { verifyToken } = require('../auth');

const routes = async (fastify, options) => {
    fastify.route({
        method: 'POST',
        url: '/api/set',
        schema: {
            body: {
                $ref: "memoSchema"
            },
    
            response: {
                201: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' }
                    }
                }
            }
        },
    
        preHandler: async (req, res) => {

        },
    
        handler: async (req, res) => {
            const memo = req.body;
            memo.timestamp = FieldValue.serverTimestamp();

            const user = verifyToken(req.headers["x-access-token"]);

            if (user) {
                const m = await updateMemo(user._id, memo._id, memo);

                if (m) {
                    return {
                        statusCode: 201,
                        msg: {
                            success: true
                        }
                    };
                }
                else {
                    return {
                        statusCode: 400,
                        msg: {
                            success: false
                        }
                    }
                }
            }
            else {
                return {
                    statusCode: 400,
                    msg: {
                        success: false
                    }
                }
            }

            
        }
    });
}

module.exports = routes;