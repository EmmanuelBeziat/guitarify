import { guitarsRoutes, brandsRoutes, stringsRoutes, tuningsRoutes, songsRoutes, usersRoutes, authRoutes } from '../routes/index.js'
import { RecordNotFound } from './errors/RecordNotFound.js'

export class Router {
	constructor () {
		this.apiURL = '/'
	}

	routes (app) {
		guitarsRoutes(app)
		brandsRoutes(app)
		stringsRoutes(app)
		tuningsRoutes(app)
		songsRoutes(app)
		usersRoutes(app)
		authRoutes(app)

		app.decorate('authenticate', async (request, reply) => {
			try {
				await request.jwtVerify()
			}
			catch (err) {
				reply.send(err)
			}
		})

		app.setErrorHandler((error, request, reply) => {
			if (error instanceof RecordNotFound) {
				reply.statusCode = 404
				console.error(error)
			}

			reply.statusCode = 500
			return {
				error: error.message
			}
		})
	}
}
