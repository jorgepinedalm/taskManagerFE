import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from './shared/services/tasks.service';
import { CommonModule } from '@angular/common';
import { Task } from './shared/models/tasks.model';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskSkeletonComponent } from './task-skeleton/task-skeleton.component';
import { TasksListEmptyComponent } from './tasks-list-empty/tasks-list-empty.component';
import { Subscription } from 'rxjs';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule, 
    TaskDetailComponent, 
    TaskSkeletonComponent, 
    TasksListEmptyComponent,
    SidebarComponent
  ],
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'task-manager';
  private taskService = inject(TaskService);
  tasks = this.taskService.getTasks();
  loadedTasks:boolean;
  subscription:Subscription;

  pendingTasks: Task[];
  completedTasks: Task[];

  constructor(){
    this.pendingTasks = [];
    this.completedTasks = [];
    this.loadedTasks = false;
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.tasks.subscribe((tasks) => {
      this.pendingTasks = tasks.filter(task => !task.isCompleted);
      this.completedTasks = tasks.filter(task => task.isCompleted);
      this.loadedTasks = true;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
