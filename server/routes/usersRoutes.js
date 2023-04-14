import { UserController } from '../controllers/index.js'

export const usersRoutes = app => {
	const users = new UserController()

	app.get('/users', users.list)
	app.post('/users', users.create)
	app.get('/user/:uuid', users.show)
	app.patch('/user/:uuid', users.update)
	app.delete('/user/:uuid', users.delete)
}
