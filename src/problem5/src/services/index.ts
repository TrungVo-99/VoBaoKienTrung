import { ErrorService } from './errorService'
import { UtilService } from '@/services/utilService'
// Crud
import { ICrudExecOption, CrudService } from './crudService'
import { TaskService } from './crud/taskService'

// SECTION

const errorService = new ErrorService()
const utilService = new UtilService()
// Crud
const taskService = new TaskService()

// SECTION

export {
	CrudService,
	ICrudExecOption,
	utilService,
	errorService,

	//Crud
	taskService
}
