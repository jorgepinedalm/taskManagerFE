import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './shared/services/tasks.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from './shared/models/tasks.model';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule]
})
export class AppComponent implements OnInit{
  
  title = 'task-manager';
  private taskService = inject(TaskService);
  private modalService = inject(NgbModal);

  tasks = this.taskService.getTasks();

  ngOnInit(): void {
    this.tasks.subscribe((tasks) => {
      console.log({tasks})
    })
  }

  openCreateTaskForm() {
		const modalRef = this.modalService.open(CreateTaskComponent);
    modalRef.result.then(
      (result) => {
        console.log({result});
      }
    )
	}

  openUpdateTaskForm(taskToUpdate:Task): void {
    const modalRef = this.modalService.open(UpdateTaskComponent);
		modalRef.componentInstance.taskToUpdate = taskToUpdate;
    modalRef.result.then(
      (result) => {
        console.log({result});
      }
    )
  }

  openDeleteTaskConfirmation(taskToDelete:Task):void {
    const modalRef = this.modalService.open(DeleteTaskComponent);
		modalRef.componentInstance.taskToDelete = taskToDelete;
    modalRef.result.then(
      (result) => {
        console.log({result});
      }
    )
  }

}
