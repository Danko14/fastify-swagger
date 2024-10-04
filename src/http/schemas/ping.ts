import { IdHeaders } from './common.js'
import { errorCodes } from './errors.js'

export const ping = {
    description: 'ping server',
    tags: ['ping'],
    // security: [
    //     {
    //         'apiKey': [],
    //     },
    // ],
    // security: IdHeaders,
    response: {
        200: {
            description: 'ping',
            type: 'object',
            properties: {
                msg: { type: 'string' },
            },
        },
        ...errorCodes,
    },
}
