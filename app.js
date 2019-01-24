const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})

const config = {
	views: 'views', 		// Set views directory 
	static: 'public', 		// Set static assets directory
	db: { 					// Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
		//url: (process.env.TURBO_ENV=='dev') ? process.env.MONGODB_URI : process.env.PROD_MONGODB_URI,
		url: 'mongodb://admin:CRT612@ds064718.mlab.com:64718/bang'
	}
}

// initialize app with config options
const app = vertex.app(config)

// enable all CORS requests
//const cors = require('cors')
//app.use(cors())

// import routes
const index = require('./routes/index')
const api = require('./routes/api')

// set routes
app.use('/', index)
app.use('/api', api)

app.use('/redoc', redoc)

module.exports = app
