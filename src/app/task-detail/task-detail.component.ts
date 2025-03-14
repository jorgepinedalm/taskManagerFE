import { Component, inject, input } from '@angular/core';
import { Task } from '../shared/models/tasks.model';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  task = input<Task>();
  private modalService = inject(NgbModal);

  
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

}
