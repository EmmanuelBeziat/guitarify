import { TuningController } from '../controllers/index.js'

export const tuningRoutes = app => {
	const tuning = new TuningController()

	app.get('/tuning', async (request, reply) => {
		const list = await tuning.list()
		reply.send(list)
	})

	app.post('/tuning', async (request, reply) => {
		const data = await tuning.create(request)
		reply.send({ meta: { code: 201, message: 'Tuning sucessfully created' }, data })
	})

	app.get('/tuning/:id', async (request, reply) => {
		const data = await tuning.show(request)
		reply.send(data)
	})

	app.patch('/tuning/:id', async (request, reply) => {
		const data = await tuning.update(request)
		reply.send({ meta: { code: 200, message: 'Tuning successfully updated' }, data})
	})

	app.delete('/tuning/:id', async (request, reply) => {
		await tuning.delete(request)
		reply.send({ meta: { code: 200, message: 'Tuning successfully deleted' }})
	})
}
