import { GuitarController } from '../controllers/index.js'

export const guitarRoutes = app => {
	const guitar = new GuitarController()

	app.addHook('onRequest', async (request, reply) => {
		/* try {
			await request.jwtVerify(token)
		}
		catch (error) {
			reply.send(error)
		} */
	})

	app.get('/guitar', async (request, reply) => {
		const list = await guitar.list()
		reply.send(list)
	})

	app.post('/guitar', async (request, reply) => {
		const data = await guitar.create(request)
		reply.send({ meta: { code: 201, message: 'Guitar sucessfully created' }, data })
	})

	app.get('/guitar/:uuid', async (request, reply) => {
		const data = await guitar.show(request)
		if (!guitar) {
			reply.send({ meta: { code: 404, message: 'Guitar not found' } })
		}
		else {
			reply.send(data)
		}
	})

	app.patch('/guitar/:uuid', async (request, reply) => {
		const data = await guitar.update(request)
		reply.send({ meta: { code: 200, message: 'Guitar successfully updated' }, data })
	})

	app.delete('/guitar/:uuid', async (request, reply) => {
		await guitar.delete(request)
		reply.send({ meta: { code: 200, message: 'Guitar successfully deleted' } })
	})
}
