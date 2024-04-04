const memoIDSchema = {
    $id: 'memoIDSchema',
    type: 'object',
    additionalProperties: false,
    required: [
        '_id'
    ],
    properties: {
        _id: { type: 'string' }
    }
};

module.exports = memoIDSchema;