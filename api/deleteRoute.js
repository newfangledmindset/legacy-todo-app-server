const { deleteMemo } = require('../db/memos');
const { verifyToken } = require('../auth');

const routes = async (fastify, options) => {
    fastify.route({
        method: 'POST',
        url: '/api/delete',
        schema: {
            body: {
                $ref: "memoIDSchema"
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
            const memoID = req.body._id;

            const user = verifyToken(req.headers["x-access-token"]);

            if (user) {
                const m = await deleteMemo(user._id, memoID);

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