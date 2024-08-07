import Ajv from 'ajv'
// @ts-ignore
import AjvError from 'ajv-errors'
import addFormats from 'ajv-formats'
import * as _ from 'lodash'

// @ts-nocheck
/* tslint:disable */
export class UtilService {
	validateJSON(schema: any, json: any = {}) {
		const ajv = new Ajv({ allErrors: true })
		AjvError(ajv, { singleError: true })
		addFormats(ajv)
		const valid = ajv.validate(schema, json)
		return {
			isValid: valid,
			message: ajv.errorsText(),
		}
	}
}
/* tslint:enable */
