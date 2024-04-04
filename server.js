const fastify = require('fastify')({
    logger: true
});
const { memoSchema, memoIDSchema, userSchema, userLoginSchema } = require('./model');

fastify.addSchema(memoSchema);
fastify.addSchema(userSchema);
fastify.addSchema(userLoginSchema);
fastify.addSchema(memoIDSchema);

const { getRoute, setRoute, deleteRoute } = require('./api');
const { loginRoute, registerRoute } = require('./auth');

fastify.register(getRoute);
fastify.register(setRoute);
fastify.register(deleteRoute);
fastify.register(loginRoute);
fastify.register(registerRoute);

const start = async () => {
    try {
        await fastify.listen({
            port: 3000,
            bodyLimit: 30 * 1024 * 1024
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();