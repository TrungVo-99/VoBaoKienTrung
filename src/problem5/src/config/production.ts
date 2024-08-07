import * as dotenv from 'dotenv'
import { config } from '@/config'

const os = require('os')
const sql = require('./database')
dotenv.config({ silent: true })
export default {
	node_env: 'production',
	server: {
		host: process.env.HOST_NAME,
		protocol: 'http',
		debug: true,
		name: 'SERVER NAME',
		port: process.env.PORT || 3000,
		secret: process.env.SERVER_SECRET,
	},
	database: {
		sessionSecret: process.env.SESSION_SECRET,
		defaultPageSize: 50,
		sql: sql.production,
	},
	socket: {
		port: 9888,
	},
}
