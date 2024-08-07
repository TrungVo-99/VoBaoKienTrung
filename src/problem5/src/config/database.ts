require('dotenv').config()
import * as path from 'path'

const p = path.join(__dirname, '..', 'database.sqlite');
module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		storage: p
	},
	production: {
		username: process.env.PROD_DB_USER,
		password: process.env.PROD_DB_PASS,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_HOST,
		dialect: 'postgresql',
		ssl: {
			require: true,
		},
		dialectOptions: {
			ssl: {
				require: true,
			},
		},
	},
}
