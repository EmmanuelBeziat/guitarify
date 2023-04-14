import { TuningController } from '../controllers/index.js'

export const tuningsRoutes = app => {
	const tunings = new TuningController()

	app.get('/tunings', tunings.list)
	app.post('/tunings', tunings.create)
	app.get('/tuning/:id', tunings.show)
	app.patch('/tuning/:id', tunings.update)
	app.delete('/tuning/:id', tunings.delete)
}
