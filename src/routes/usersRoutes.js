import { UserController } from '../controllers/index.js'

export const usersRoutes = app => {
	const users = new UserController()

	app.get('/users', users.list)

	app.post('/users', (request, reply) => {
		const data = users.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'User sucessfully created' }, data })
	})

	app.get('/user/:uuid', users.show)
	app.patch('/user/:uuid', users.update)
	app.delete('/user/:uuid', users.delete)
}
