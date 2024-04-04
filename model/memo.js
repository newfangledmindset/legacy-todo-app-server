const memoSchema = {
    $id: 'memoSchema',
    type: 'object',
    additionalProperties: false,
    required: [
        'article',
        'color',
        'title'
    ],
    properties: {
        _id: { type: 'string' },
        article: { type: 'string' },
        color: { type: 'string' },
        title: { type: 'string' }
    }
};

module.exports = memoSchema;