import { MasteryController } from '../controllers/index.js'

export const masteryRoutes = app => {
	const mastery = new MasteryController()

	app.get('/mastery', async (request, reply) => {
		const list = await mastery.list()
		reply.send(list)
	})

	app.post('/mastery', async (request, reply) => {
		const data = await mastery.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Mastery sucessfully created' }, data })
	})

	app.get('/mastery/:id', async (request, reply) => {
		const data = await mastery.show(request)
		reply.send(data)
	})

	app.patch('/mastery/:id', async (request, reply) => {
		const data = await mastery.update(request)
		reply.send({ meta: { code: 200, message: 'Mastery successfully updated' }, data })
	})

	app.delete('/mastery/:id', async (request, reply) => {
		await mastery.delete(request)
		reply.send({ meta: { code: 200, message: 'Mastery sucessfully deleted' }})
	})
}
