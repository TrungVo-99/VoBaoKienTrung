import {
	delete_item_params,
	get_item_params,
	get_list_params,
	response_schema,
	update_item_params,
} from '../common'
const tag_name = 'task';
export const taskPath = {
	tag_name,
	paths: {
		'/task': {
			get: {
				summary: 'Get list task',
				tags: [tag_name],
				parameters: [...get_list_params],
				responses: response_schema,
			},
			post: {
				summary: 'Create new task',
				tags: [tag_name],
				description: 'create new task',
				security: [
					{
						bearerAuth: [] as any[],
					},
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								properties: {
									title: { type: 'string' },
									description: { type: 'string' },
								},
							},
						},
					},
				},
				responses: response_schema,
			},
		},
		'/task/{id}': {
			get: {
				summary: 'Get one task',
				tags: [tag_name],
				security: [
					{
						bearerAuth: [] as any[],
					},
				],
				parameters: [...get_item_params],
				responses: response_schema,
			},
			put: {
				summary: 'Update one task',
				tags: [tag_name],
				description: 'update one item',
				security: [
					{
						bearerAuth: [] as any[],
					},
				],
				requestBody: {
					required: true,
					content: {
						'application/json': {
							schema: {
								properties: {
									title: { type: 'string' },
									description: { type: 'string' },
								},
							},
						},
					},
				},
				parameters: [...update_item_params],
				responses: response_schema,
			},
			delete: {
				summary: 'Delete one task',
				tags: [tag_name],
				description: 'delete one item',
				security: [
					{
						bearerAuth: [] as any[],
					},
				],
				parameters: [...delete_item_params],
				responses: response_schema,
			},
		},
	},
}
