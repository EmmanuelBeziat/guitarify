import { db } from './database.js'
import { passwordCompare } from './hash.js'

/**
 *
 * @param {*} request
 * @param {*} jwt
 * @returns
 */
export const login = (request, jwt) => {
	if (request.method === 'POST') {
		const { username, password } = request.query
		const user = db.prepare(`SELECT * FROM Users WHERE username = ?`).get(username)

		if (user !== undefined && passwordCompare(password, user.password)) {
			const token = jwt.sign({ username })
			return { username, token }
		}
		throw new Error('Identifiants invalides')
	}
}

/**
 *
 * @param {*} request
 * @param {*} reply
 */
export const logout = (request, reply) => {
	reply.send('logout')
}

