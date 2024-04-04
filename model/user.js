const userSchema = {
    $id: 'userSchema',
    type: 'object',
    additionalProperties: false,
    required: [
        'id',
        'password',
        'username'
    ],
    properties: {
        id: { type: 'string' },
        password: { type: 'string' },
        username: { type: 'string' }
    }
};

module.exports = userSchema;