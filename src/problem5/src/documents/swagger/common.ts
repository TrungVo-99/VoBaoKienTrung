export const get_list_params: any[] = [
	{
		name: 'fields',
		in: 'query',
		schema: {
			type: 'string',
			default: `["$all"]`,
		},
	},
	{
		name: 'where',
		in: 'query',
		content: {
			'application/json': {
				schema: {
					type: 'object',
				},
			},
		},
	},
	{
		name: 'limit',
		in: 'query',
		schema: {
			type: 'number',
			default: `50`,
		},
	},
	{
		name: 'page',
		in: 'query',
		schema: {
			type: 'number',
			default: `1`,
		},
	},
	{
		name: 'order',
		in: 'query',
		schema: {
			type: 'string',
			default: ``,
			example: `[['created_at', 'desc]]`,
		},
	},
]

export const get_item_params: any[] = [
	{
		name: 'fields',
		in: 'query',
		schema: {
			type: 'string',
			default: `["$all"]`,
		},
	},
	{
		name: 'id',
		in: 'path',
		required: true,
		schema: {
			type: 'string',
			format: 'uuid',
		},
	},
]

export const update_item_params: any[] = [
	{
		name: 'id',
		in: 'path',
		required: true,
		schema: {
			type: 'string',
			format: 'uuid',
		},
	},
]

export const delete_item_params: any[] = [
	{
		name: 'id',
		in: 'path',
		required: true,
		schema: {
			type: 'string',
			format: 'uuid',
		},
	},
]

export const delete_item_params_v2: any[] = [
	{
		name: 'items',
		in: 'query',
		required: true,
		schema: {
			type: 'string',
			default: `[]`,
		},
	},
]

export const response_schema = {
	content: {
		'application/json': {
			schema: {
				type: 'object',
			},
		},
	},
}

export const update_item_schema = {
	require: true,
	content: {
		'application/json': {
			schema: {
				type: 'object',
			},
		},
	},
}
