const { getMemos } = require('../db/memos');
const { verifyToken } = require('../auth');

const routes = async (fastify, options) => {
    fastify.route({
        method: 'POST',
        url: '/api/get',
        schema: {
            body: {},
            response: {
                201: {
                    type: 'object',
                    properties: {
                        hello: { type: 'string' }
                    }
                }
            }
        },
    
        preHandler: async (req, res) => {

        },
    
        handler: async (req, res) => {
            const user = verifyToken(req.headers["x-access-token"]);

            if (user) {
                const arr = [];
                const memos = await getMemos(user._id);

                memos.forEach(doc => {
                    const docData = doc.data();
                    docData._id = doc.id;
                    arr.push(docData);
                });
                
                return arr;
            }
            else return {
                statusCode: 401,
                msg: 'Invalid token'
            };
        }
    });
}

module.exports = routes;