import { TaskController } from './crud/taskController'
import { CrudController } from './crudController'

// SECTION

// Crud
const taskController = new TaskController()

// SECTION

export { 
    CrudController,
    taskController
}
