import { Model, ModelDefined } from 'sequelize'

export class BaseComponent {
	private model: ModelDefined<any, any>
	private properties: { [key: string]: any }
	private type: string
	constructor(model: ModelDefined<any, any>) {
		this.model = model
		this.properties = {}
	}

	setType(type: string) {
		this.type = type
		return this
	}
	getProperties() {
		for (const key of Object.keys(this.model.rawAttributes)) {
			this.properties[key] = {
				type: (this.model.rawAttributes[key].type as any).key,
			}
		}
		return this
	}

	getSwaggerComponentModel(type?: string) {
		return {
			type: type ?? this.type,
			properties: this.properties,
		}
	}
}
