import { GuitarController } from '../controllers/index.js'

export const guitarsRoutes = app => {
	const guitars = new GuitarController()

	app.addHook('onRequest', async (request, reply) => {
		/* try {
			await request.jwtVerify(token)
		}
		catch (error) {
			reply.send(error)
		} */
	})

	app.get('/', (request, reply) => {
		reply.view('views/dashboard.ejs', { guitars: guitars.list() })
	})

	app.post('/guitars', (request, reply) => {
		const data = guitars.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Guitar sucessfully created' }, data })
	})

	app.get('/guitar/:uuid', guitars.show)
	app.patch('/guitar/:uuid', guitars.update)
	app.delete('/guitar/:uuid', guitars.delete)
}
