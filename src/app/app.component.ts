import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from './shared/services/tasks.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from './shared/models/tasks.model';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, TaskDetailComponent],
})
export class AppComponent implements OnInit{
  
  title = 'task-manager';
  private taskService = inject(TaskService);
  private modalService = inject(NgbModal);
  tasks = this.taskService.getTasks();

  pendingTasks: Task[];
  completedTasks: Task[];

  constructor(){
    this.pendingTasks = [];
    this.completedTasks = [];
  }

  ngOnInit(): void {
    this.tasks.subscribe((tasks) => {
      this.pendingTasks = tasks.filter(task => !task.isCompleted);
      this.completedTasks = tasks.filter(task => task.isCompleted);
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

}
