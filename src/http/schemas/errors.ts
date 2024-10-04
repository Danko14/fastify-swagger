export const errorCodes = {
    400: {
        type: 'object',
        description: 'Bad Request',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
    401: {
        type: 'object',
        description: 'Unauthorized',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
    403: {
        type: 'object',
        description: 'Forbidden',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
    404: {
        type: 'object',
        description: 'Not found',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
}
