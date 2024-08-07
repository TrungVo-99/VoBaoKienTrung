import { component } from './documents/swagger/components'
import { paths, tags_name } from './documents/swagger/paths'
import * as _ from 'lodash'

const swaggerDocument = {
	openapi: '3.0.1',
	info: {
		title: 'REST API for Swagger Documentation',
		version: '1.0.0',
		termsOfService: 'http://swagger.io/terms/',
		license: {
			name: 'Apache 2.0',
			url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
		},
	},
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	servers: [
		{
			url: `http://localhost:${process.env.PORT}/api/v1`,
			description: 'api local.',
			basePath: { default: 'v1' },
		},
	],
	tags: _.sortBy(tags_name, (t) => t.name),
	components: component,
	security: [
		{
			bearerAuth: [] as any[],
		},
	],
	paths: paths,
}
export { swaggerDocument }
