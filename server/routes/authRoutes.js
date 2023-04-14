import { login, logout } from '../methods/auth.js'

export const authRoutes = app => {
	app.post('/login', (req) => {
		const jwt = app.jwt
		return login(req, jwt)
	})
	app.post('/logout', logout)
}
