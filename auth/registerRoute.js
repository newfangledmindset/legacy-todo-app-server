const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUser, createUser } = require('../db/users');

const jwtConfig = require('../config/jwtConfig.json');

const routes = async (fastify, options) => {
    fastify.route({
        method: 'POST',
        url: '/auth/register',
        schema: {
            body: {
                $ref: 'userSchema'
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

                if (await getUser(body.id)) return {
                    statusCode: 200,
                    message: "A user already exists."
                };

                const encPassword = await bcrypt.hash(req.body.password, 10);

                body.password = encPassword;

                const user = await createUser(body);

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
                    message: "An error has occured."
                };
            }
        }
    });
}

module.exports = routes;