import { MasteryController } from '../controllers/index.js'

export const masteriesRoutes = app => {
	const masteries = new MasteryController()

	app.get('/masteries', async (request, reply) => {
		const masteriesList = await masteries.list()
		reply.send(masteriesList)
	})

	app.post('/mastery', async (request, reply) => {
		const mastery = await masteries.create(request)
		reply.code(201).send({ meta: { code: 201, message: 'Mastery sucessfully created' }, mastery })
	})

	app.get('/mastery/:id', async (request, reply) => {
		const mastery = await masteries.show(request)
		reply.send(mastery)
	})

	app.patch('/mastery/:id', async (request, reply) => {
		const updatedMastery = await masteries.update(request)
		reply.send({ meta: { code: 200, message: 'Mastery successfully updated' }, updatedMastery })
	})

	app.delete('/mastery/:id', async (request, reply) => {
		await masteries.delete(request)
		reply.send({ meta: { code: 200, message: 'Mastery sucessfully deleted' }})
	})
}
