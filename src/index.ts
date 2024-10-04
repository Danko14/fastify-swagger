import { HttpServer } from './http/server.js'

async function main() {
    const server = new HttpServer({}, {
        host: process.env.HTTP_HOST ?? '0.0.0.0',
        port: Number(process.env.HTTP_PORT ?? 80),
    })

    await server.init()
    await server.start()
    process.once('SIGINT', async () => {
        await server.stop()
        process.exit(0)
    })
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
