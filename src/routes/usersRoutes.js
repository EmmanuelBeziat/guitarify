import { UserController } from '../controllers/index.js'

export const usersRoutes = app => {
	const users = new UserController()

	app.get('/users', async (request, reply) => {
		const usersList = await users.list()
		reply.send(usersList)
	})

	app.post('/users', async (request, reply) => {
		const user = await users.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'User sucessfully created' }, user })
	})

	app.get('/user/:uuid', async (request, reply) => {
		const user = await users.show(request)
		reply.send(user)
	})

	app.patch('/user/:uuid', async (request, reply) => {
		const user = await users.update(request)
		reply.send({ meta: { code: 200, message: 'User successfully updated' }, user})
	})

	app.delete('/user/:uuid', async (request, reply) => {
		await users.delete(request)
		reply.send({ meta: { code: 200, message: 'User successfully deleted' }})
	})
}
