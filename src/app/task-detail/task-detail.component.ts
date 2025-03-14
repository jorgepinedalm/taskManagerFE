import { Component, inject, input } from '@angular/core';
import { Task } from '../shared/models/tasks.model';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { TaskService } from '../shared/services/tasks.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  task = input<Task>();
  private modalService = inject(NgbModal);
  disableCompleteButton:boolean = true;
  private taskService = inject(TaskService);
  
  openUpdateTaskForm(): void {
    const modalRef = this.modalService.open(UpdateTaskComponent);
		modalRef.componentInstance.taskToUpdate = this.task();
    modalRef.result.then(
      (result) => {
        console.log({result});
      }
    )
  }

  openDeleteTaskConfirmation():void {
    const modalRef = this.modalService.open(DeleteTaskComponent);
		modalRef.componentInstance.taskToDelete = this.task();
    modalRef.result.then(
      (result) => {
        console.log({result});
      }
    )
  }

  completeTask(){
      this.disableCompleteButton = true;
      const task = this.task();
      if(task){
        this.taskService.updateTask(task.id, {...task, isCompleted: !task.isCompleted})
        .pipe(
          catchError((error) => {
            this.disableCompleteButton = false;
            throw error
          })
        )
        .subscribe(
          () => {
            this.disableCompleteButton = false;
          }
        )
      }
      
    }

}
