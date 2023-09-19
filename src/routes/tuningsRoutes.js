import { TuningController } from '../controllers/index.js'

export const tuningsRoutes = app => {
	const tunings = new TuningController()

	app.get('/tunings', async (request, reply) => {
		const tuningsList = await tunings.list()
		reply.send(tuningsList)
	})

	app.post('/tunings', async (request, reply) => {
		const tuning = await tunings.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Tuning sucessfully created' }, tuning })
	})

	app.get('/tuning/:id', async (request, reply) => {
		const tuning = await tunings.show(request)
		reply.send(tuning)
	})

	app.patch('/tuning/:id', async (request, reply) => {
		const tuning = await tunings.update(request)
		reply.send({ meta: { code: 200, message: 'Tuning successfully updated' }, tuning})
	})

	app.delete('/tuning/:id', async (request, reply) => {
		await tunings.delete(request)
		reply.send({ meta: { code: 200, message: 'Tuning successfully deleted' }})
	})
}
