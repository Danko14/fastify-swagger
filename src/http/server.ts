import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import versionsControllers from './controllers/ping.js'
import swagger from './plugins/swagger.js'
import { IRequestContext } from './requestContext.js'

export class HttpServer {
    container
    config: {
      host: string,
      port: number
    }

    server: FastifyInstance

    constructor(di, config: { host: string, port: number }) {
        this.container = di
        this.config = config

        this.server = fastify({
            ignoreTrailingSlash: true,
            ignoreDuplicateSlashes: true,
            logger: true,
        })
    }

    createRequestContext(): IRequestContext {
        return this.container
    }

    async init() {
        await this.server.register(swagger)
        await this.server.register(cors, {
            origin: true,
        })
        await this.server.register(versionsControllers, {
            prefix: '/',
            createRequestContext: this.createRequestContext.bind(this),
        })
    }

    async start() {
        const address = await this.server.listen({
            port: this.config.port,
            host: '0.0.0.0',
        })
        this.server.log.info(`HTTP Server listening at ${address}`)
    }

    async stop() {
        this.server.log.info('Stopping HTTP server...')
        await this.server.close()
        this.server.log.info('HTTP Server stopped')
    }
}
