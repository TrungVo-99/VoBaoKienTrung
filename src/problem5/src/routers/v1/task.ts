import {
	authInfoMiddleware,
	queryMiddleware,
} from '@/middlewares'
import * as _ from 'lodash'
import { Request, Response } from '../base'
import { CrudRouter } from '../crud'
import { taskController } from '@/controllers'

export default class TaskRouter extends CrudRouter<typeof taskController> {
	constructor() {
		super(taskController)
	}

	async create(req: Request, res: Response) {
		console.log('create: ', req.body)
		await this.validateJSON(req.body, {
			type: 'object',
			properties: {
				title: {
					type: 'string',
				},
				description: {
					type: 'string',
				},
			},
			required: ['title'],
		})
		const result = await this.controller.create(req.body)
		this.onSuccess(res, result)
	}

	getListMiddlewares(): any[] {
		return [queryMiddleware.run()]
	}

	getItemMiddlewares(): any[] {
		return [queryMiddleware.run()]
	}
	updateMiddlewares(): any[] {
		return []
	}
	deleteMiddlewares(): any[] {
		return []
	}
	createMiddlewares(): any[] {
		return []
	}
}
