import * as dotenv from 'dotenv'
const sql = require('./database')
dotenv.config({ silent: true })
export default {
	node_env: 'development',
	server: {
		host: 'localhost',
		protocol: 'http',
		debug: true,
		name: 'LOCAL NAME',
		port: process.env.PORT || 3000,
		secret: process.env.SERVER_SECRET,
	},
	database: {
		sessionSecret: process.env.SESSION_SECRET,
		defaultPageSize: 50,
		sql: sql.development,
	},
	socket: {
		port: 9888,
	},
}
