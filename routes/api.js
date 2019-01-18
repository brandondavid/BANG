const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')

router.get('/:resource', (req, res) => {
	const resource = req.params.resource
	const filters = req.query
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource not found' })
		return
	}

	controller.get(filters)
	.then(data => {
		//res.setHeader("Access-Control-Allow-Origin", "*");
		//res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.status(200).json(data)
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

router.get('/:resource/:id', (req, res) => {
	const resource = req.params.resource
	const id = req.params.id
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource not found' })
		return
	}

	controller.getById(id)
	.then(data => {
		if (data){
			res.status(200).json(data)
		}
		else {
			res.status(404).json({ ERROR: 'ID not found' })
		}
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message})
	})
})

router.post('/:resource', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource not found' })
		return
	}

	controller.post(req.body)
	.then(data => {
		res.status(201).json(data)
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

router.put('/:resource/:id', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource not found' })
		return
	}

	controller.put(req.params.id, req.body)
	.then(data => {
		res.status(201).json(data)
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

router.delete('/:resource/:id', (req, res) => {
	const resource = req.params.resource
	const controller = controllers[resource]

	if (controller == null){
		res.status(404).json({ ERROR: 'Resource not found' })
		return
	}

	controller.delete(req.params.id)
	.then(data => {
		res.status(204).json(data)
	})
	.catch(err => {
		res.status(400).json({ ERROR: err.message })
	})
})

module.exports = router
