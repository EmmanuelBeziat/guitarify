import { db } from './database.js'
import { passwordCompare } from './hash.js'
import fastifyJwt from '@fastify/jwt'

export const login = (req, reply) => {
	if (req.method === 'POST') {
		const { username, password } = req.query
		const user = db.prepare(`SELECT * FROM Users WHERE username = ?`).get(username)
		/* const token = fastifyJwt.sign({ username })
		console.log(token) */

		if (user !== undefined && passwordCompare(password, user.password)) {
			return user
		}
		throw new Error('Identifiants invalides')
	}
}

export const logout = (req, reply) => {
	reply.send('logout')
}
