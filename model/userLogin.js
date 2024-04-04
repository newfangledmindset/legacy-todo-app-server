const userLoginSchema = {
    $id: 'userLoginSchema',
    type: 'object',
    additionalProperties: false,
    required: [
        'id',
        'password'
    ],
    properties: {
        id: { type: 'string' },
        password: { type: 'string' }
    }
};

module.exports = userLoginSchema;