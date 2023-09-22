import { guitarRoutes, brandRoutes, stringsRoutes, tuningRoutes, songRoutes, userRoutes, playlistRoutes, masteryRoutes, authRoutes } from '../routes/index.js'
import { RecordNotFound } from './errors/RecordNotFound.js'

export class Router {
	constructor () {
		this.apiURL = '/'
	}

	routes (app) {
		guitarRoutes(app)
		brandRoutes(app)
		stringsRoutes(app)
		tuningRoutes(app)
		songRoutes(app)
		playlistRoutes(app)
		masteryRoutes(app)
		userRoutes(app)
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
