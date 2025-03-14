import { Component, inject, Input } from '@angular/core';
import { Task } from '../shared/models/tasks.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TaskService } from '../shared/services/tasks.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-delete-task',
  imports: [CommonModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {
  @Input() taskToDelete?:Task;
  activeModal = inject(NgbActiveModal);
  private taskService = inject(TaskService);
  disableButton:boolean;

  constructor(){
    this.disableButton = false;
  }

  deleteTask(){
    this.disableButton = true;
    this.taskService.removeTask(this.taskToDelete?.id ?? 0)
    .pipe(
      catchError((error) => {
        this.disableButton = false;
        throw error
      })
    )
    .subscribe(
      () => {
        this.disableButton = false;
        this.activeModal.close("La tarea se ha eliminado exitosamente");
      }
    )
  }
}
