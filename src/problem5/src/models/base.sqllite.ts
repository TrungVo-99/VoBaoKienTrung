import { config } from '@/config'
import { Sequelize } from 'sequelize'
import { operatorsAliases } from "@/common/constant";

let option = undefined
if (process.env.NODE_ENV === "production") {
    option = {
        host: config.database.sql['host'],
        dialect: config.database.sql['dialect'],
        storage: config.database.sql['storage'],
        pool: {
            max: 150,
            min: 0,
            idle: 200000,
            acquire: 1000000,
        },
        logging: false,
        timezone: "+00:00",
        "dialectOptions": {
            "ssl": {
                "require": false,
                "rejectUnauthorized": false,
            }
        }
    }
} else {
    option = {
        host: config.database.sql['host'],
        dialect: config.database.sql['dialect'],
        storage: config.database.sql['storage'],
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        logging: false,
        timezone: "+00:00",
        "dialectOptions": {
            "ssl": {
                "require": false,
                "rejectUnauthorized": false
            }
        }
    }
}
const sequelize = new Sequelize(
    {
        ...option,
        operatorsAliases,
    }
)

const connectionDatabase = async () => {
    console.log('=== Connecting to Database....')
	try {
		await sequelize.authenticate()
		console.log('connection successful!')
	} catch (error) {
		console.log('error:', error)
	}
}

connectionDatabase()

export {
    Sequelize,
    sequelize
}
