import { CrudController } from "../crudController";
import { taskService } from '@/services'

export class TaskController extends CrudController<typeof taskService> {

    constructor(){
        super(taskService)
    }
}