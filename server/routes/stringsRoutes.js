import { StringsController } from '../controllers/index.js'

export const stringsRoutes = app => {
	const strings = new StringsController()

	app.get('/strings', strings.list)
	app.post('/strings', strings.create)
	app.get('/strings/:id', strings.show)
	app.patch('/strings/:id', strings.update)
	app.delete('/strings/:id', strings.delete)
}
