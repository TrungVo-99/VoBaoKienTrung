import * as models from '@/models/tables'
import { BaseComponent } from './baseComponent'
export const Task = new BaseComponent(models.Task).getProperties().getSwaggerComponentModel()
