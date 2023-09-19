import { login, logout } from '../utils/auth.js'

export const authRoutes = app => {

	const opts = {
		preHandler: (request, reply, done) => {
			console.log('prehandler')
			done()
		}
	}

	app.post('/login', opts, (request, reply) => {
		const jwt = app.jwt
		return login(request, jwt)
	})

	app.post('/logout', logout)
}
