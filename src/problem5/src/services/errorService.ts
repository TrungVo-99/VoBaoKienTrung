import {
	RouterExceptionService,
	DatabaseExceptionService,
} from './errors'
import { AuthExceptionService } from '@/services/errors/authErrorService'
export class ErrorService {
	constructor() {
		this.router = new RouterExceptionService()
		this.auth = new AuthExceptionService()
		this.database = new DatabaseExceptionService()
	}
	router: RouterExceptionService
	auth: AuthExceptionService
	database: DatabaseExceptionService
}
