import { Component, inject, Input, OnDestroy } from '@angular/core';
import { Task } from '../shared/models/tasks.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TaskService } from '../shared/services/tasks.service';
import { catchError, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-task',
  imports: [CommonModule],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent implements OnDestroy{
  @Input() taskToDelete?:Task;
  activeModal = inject(NgbActiveModal);
  private taskService = inject(TaskService);
  disableButton:boolean;
  subscription:Subscription;

  constructor(){
    this.disableButton = false;
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Delete task.
   * Disable button while the server send data
   */
  deleteTask(){
    this.disableButton = true;
    this.subscription = this.taskService.removeTask(this.taskToDelete?.id ?? 0)
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
