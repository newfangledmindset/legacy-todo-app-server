const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig.json')

const { validateUser } = require('../db/users');

const routes = async (fastify, options) => {
    fastify.route({
        method: 'POST',
        url: '/auth/login',
        schema: {
            body: {
                $ref: 'userLoginSchema'
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        authToken: { type: 'string' }
                    }
                }
            },
        },
    
        preHandler: async (req, res) => {

        },
    
        handler: async (req, res) => {
            try {
                const body = await req.body;
                const user = await validateUser(body.id, body.password);

                if (user) {
                    const token = jwt.sign({
                        _id: user.id,
                        _username: user.username
                    }, jwtConfig.JWT_SECRET, {
                        expiresIn: jwtConfig.JWT_EXPIRES_IN
                    });

                    return {
                        authToken: token
                    };
                }
            }
            catch (e) {
                console.error(e);
                return {
                    statusCode: 400,
                    message: "A user already exists."
                };
            }
            
        }
    });
}

module.exports = routes;