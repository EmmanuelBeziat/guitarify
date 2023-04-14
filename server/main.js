import App from './classes/App.js'
import api from 'fastify-api'
import vite from 'fastify-vite'
import formBody from '@fastify/formbody'
import jwt from '@fastify/jwt'
import helmet from '@fastify/helmet'

App.register(api)
App.register(vite, { api: true })
App.register(jwt, {	secret: process.env.API_SECRET_KEY })
App.register(helmet, { global: true })
App.register(formBody)

App.listen({ port: process.env.API_PORT || 3000, host: process.env.API_HOST || '127.0.0.1' })
	.then(address => {
		console.log(`Server started on ${address}`)
	})
	.catch(error => {
		console.error(`Error starting server: ${error}`)
		process.exit(1)
	})
