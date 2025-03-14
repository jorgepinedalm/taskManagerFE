import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/tasks.model';

@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

  transform(value: Task[] | null, isCompleted:boolean): Task[] | null {
    return value?.filter(val => val.isCompleted === isCompleted) || [];
  }

}
