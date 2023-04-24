import App from './classes/App.js'
import fastifyApi from 'fastify-api'
import fastifyFormBody from '@fastify/formbody'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyHelmet from '@fastify/helmet'
import fastifyView from '@fastify/view'
import fasitfyStatic from '@fastify/static'
import ejs from 'ejs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

App.register(fastifyApi)
App.register(fastifyJwt, { secret: process.env.API_SECRET_KEY })
App.register(fastifyHelmet, { global: true })
App.register(fastifyFormBody)
App.register(fastifyView, {
	engine: {
		ejs
	}
})
App.register(fasitfyStatic, {
	root: join(dirname(dirname(fileURLToPath(import.meta.url), 'public'))),
})
App.register(fastifyCors, {
	origin: (origin, cb) => {
		if (/localhost/.test(origin) || '127.0.0.1' || 'https://www.emmanuelbeziat.com') {
			cb(null, true)
			return
		}

		cb(new Error('Not allowed'))
	}
})

App.listen({ port: process.env.API_PORT || 3000, host: process.env.API_HOST || '127.0.0.1' })
	.then(address => {
		console.log(`Server started on ${address}`)
	})
	.catch(error => {
		console.error(`Error starting server: ${error}`)
		process.exit(1)
	})
