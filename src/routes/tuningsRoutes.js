import { TuningController } from '../controllers/index.js'

export const tuningsRoutes = app => {
	const tunings = new TuningController()

	app.get('/tunings', tunings.list)

	app.post('/tunings', (request, reply) => {
		const data = tunings.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Tuning sucessfully created' }, data })
	})

	app.get('/tuning/:id', tunings.show)
	app.patch('/tuning/:id', tunings.update)
	app.delete('/tuning/:id', tunings.delete)
}
