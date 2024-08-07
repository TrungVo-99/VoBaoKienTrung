import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'
import { config } from '@/config'
import api from './routers'
import * as cors from 'cors'
import { Task } from './models'
import * as swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './swagger'
/**
 * Express configuration.
 */
const app = express()
// sequelize.sync({force: false, alter: true});
app.use(
	logger('common', {
		skip: function (req, res) {
			if (req.url == '/_ah/health') {
				return true
			} else {
				return false
			}
		},
	}),
)


app.get('/policy', function (req: any, res: any) {
	res.render('policy')
})

app.use(
	bodyParser.json({
		limit: '50mb',
	}),
)
app.use(
	bodyParser.urlencoded({
		extended: false,
		limit: '50mb',
	}),
)
app.use('/api/*', cors())
app.use('/api', api)
app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.set('port', config.server.port)
app
	.get('/', async function (req: any, res: any) {
		const tasks = await Task.findAll();
		console.log('tasks: ', tasks)
		res.send('App is running')
	})
	.listen(app.get('port'), function () {
		console.log(
			`${config.server.name} started at ${config.server.protocol}://${
				config.server.host
			}:${app.get('port')}`,
		)
	})
