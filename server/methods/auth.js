import { db } from './database.js'
import { passwordCompare } from './hash.js'

export const login = (req, reply, jwt) => {
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

export const logout = (req, reply) => {
	reply.send('logout')
}
