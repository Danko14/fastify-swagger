import { FastifyInstance } from 'fastify'
import assert from 'assert'
import { ping } from '../schemas/ping.js'
import { Forbidden, InvalidRequestError } from '../../errors/index.js'
import * as HttpErrors from '../errors/HttpErrors.js'
import auth from '../middlewares/auth.js'
import { TIdHeaders } from '../schemas/common.js'
import { IRequestContext } from '../requestContext.js'

export default async (fastify: FastifyInstance, options: { createRequestContext: () => IRequestContext }) => {
    fastify.setErrorHandler((error, request, reply) => {
        console.log(error)
        const { message } = error
        const httpError = (() => {
            if (error instanceof Forbidden) return new HttpErrors.Forbidden()
            if (error instanceof InvalidRequestError) return new HttpErrors.BadRequest(message)
            if (error instanceof HttpErrors.Unauthorized) return error
            return new HttpErrors.InternalServerError()
        })()

        reply.status(httpError.statusCode).send({ message: httpError.message })
    })

    fastify.get<{ Headers: TIdHeaders }>('/ping', { schema: ping }, async (req, res) => {
        const actor = auth(req.headers)
        assert(actor.type === 'admin', new Forbidden())

        res.code(200).send({ msg: 'ok' })
    })
}
