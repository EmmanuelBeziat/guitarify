import Brand from '../models/Brand.js'

export class BrandController {
	list () {
		return Brand.list()
	}

	show (req) {
		return Brand.show(req.params.id, { ...req.query })
	}

	create (req) {
		return Brand.create({ ...req.query })
	}

	update (req) {
		return Brand.update(req.params.id, { ...req.query })
	}

	delete (req) {
		return Brand.delete(req.query.id)
	}
}
