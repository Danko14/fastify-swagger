import swaggerUi from '@fastify/swagger-ui'
import fastifySwagger from '@fastify/swagger'
import fp from 'fastify-plugin'
import fs from 'fs'

const version = fs.readFileSync('version').toString()
export default fp(async fastify => {
    fastify.register(
        fastifySwagger,
        {
            openapi: {
                info: {
                    title: 'Mock server',
                    description: 'API documentation',
                    version,
                },
                servers: [
                    { url: `http://${process.env.HTTP_SERVER_API_URL}`, description: 'HTTP' },
                    { url: `https://${process.env.HTTPS_SERVER_API_URL}`, description: 'HTTPS' },
                ],
                // components: {
                //     securitySchemes: {
                //         actorId: {
                //             type: 'apiKey',
                //             in: 'header',
                //             name: 'x-actor-id',
                //         },
                //         actorType: {
                //             type: 'apiKey',
                //             in: 'header',
                //             name: 'x-actor-type',
                //         },
                //     },
                // },
                // security: [
                //     { ApiKeyAuth: [] },
                //     { ActorTypeAuth: [] },
                // ],
            },
        },
    )
    fastify.register(swaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false,
        },
        staticCSP: false,
        transformSpecification: (swaggerObject, request, reply) => swaggerObject,
        transformSpecificationClone: true,
    })
})
