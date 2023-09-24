import { UserController } from '../controllers/index.js'

export const userRoutes = app => {
	const user = new UserController()

	app.get('/user', async (request, reply) => {
		const list = await user.list()
		reply.send(list)
	})

	app.post('/user', async (request, reply) => {
		const data = await user.create(request)
		reply.send({ meta: { code: 201, message: 'User sucessfully created' }, data })
	})

	app.get('/user/:uuid', async (request, reply) => {
		const data = await user.show(request)
		reply.send(data)
	})

	app.get('/user/login', async (request, reply) => {
		const data = await user.showByIdentifier(request)
		reply.send(data)
	})

	app.patch('/user/:uuid', async (request, reply) => {
		const data = await user.update(request)
		reply.send({ meta: { code: 200, message: 'User successfully updated' }, data})
	})

	app.delete('/user/:uuid', async (request, reply) => {
		await user.delete(request)
		reply.send({ meta: { code: 200, message: 'User successfully deleted' }})
	})
}
