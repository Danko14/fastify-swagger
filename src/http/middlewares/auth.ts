import assert from 'assert'
import { TIdHeaders } from '../schemas/common'
import { Unauthorized } from '../errors/HttpErrors.js'

export default (headers: TIdHeaders): { id: string, type: 'user' | 'admin' } => {
    const id = headers['x-actor-id']
    const type = headers['x-actor-type']
    // assert(id && type, new Unauthorized('No Credentials'))
    return { id, type }
}
