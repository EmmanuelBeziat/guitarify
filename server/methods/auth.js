import { db } from './database.js'
import { passwordCompare } from './hash.js'

/**
 *
 * @param {*} req
 * @param {*} jwt
 * @returns
 */
export const login = (req, jwt) => {
	if (req.method === 'POST') {
		const { username, password } = req.query
		const user = db.prepare(`SELECT * FROM Users WHERE username = ?`).get(username)

		if (user !== undefined && passwordCompare(password, user.password)) {
			const token = jwt.sign({ username })
			return { logged: true, username, token }
		}
		throw new Error('Identifiants invalides')
	}
}

/**
 *
 * @param {*} req
 * @param {*} reply
 */
export const logout = (req, reply) => {
	reply.send('logout')
}
