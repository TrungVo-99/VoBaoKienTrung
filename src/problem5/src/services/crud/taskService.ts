import { ICrudOption } from '@/interfaces'
import { CrudService } from '../crudService.sqllite'
import { Task } from '@/models/tables'
import { config } from '@/config'

export class TaskService extends CrudService<typeof Task> {
	constructor() {
		super(Task)
	}
}
