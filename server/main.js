import App from './classes/App.js'
import fastifyApi from 'fastify-api'
import fastifyVite from 'fastify-vite'
import fastifyFormbody from '@fastify/formbody'
import fastifyJwt from '@fastify/jwt'

App.register(fastifyApi)
App.register(fastifyVite, {
	api: true,
	// clientEntryPath: '/entry/client.js',
	// serverEntryPath: '/entry/server.js'
})
App.register(fastifyJwt, {
	secret: process.env.API_SECRET_KEY
})
App.register(fastifyFormbody)


App.listen({ port: process.env.API_PORT || 3000, host: process.env.API_HOST || '127.0.0.1' })
	.then(address => {
		console.log(`Server started on ${address}`)
	})
	.catch(error => {
		console.error(`Error starting server: ${error}`)
		process.exit(1)
	})
