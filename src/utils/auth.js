import { UserController } from '../controllers/index.js'
import { passwordCompare } from './hash.js'

/**
 *
 * @param {*} request
 * @param {*} jwt
 * @returns
 */
export const login = async (request, jwt) => {
	const registeredUser = new UserController()

	if (request.method === 'POST') {
		const { username, password } = request.query
		const user = await registeredUser.showByIdentifier(username)

		if (user !== undefined && passwordCompare(password, user.password)) {
			const { username, email } = user
			const token = jwt.sign({ username, email })
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

