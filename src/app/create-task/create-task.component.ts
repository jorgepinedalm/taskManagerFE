import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../shared/models/tasks.model';
import { TaskService } from '../shared/services/tasks.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-create-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent{
  taskForm:FormGroup;
  @Input() taskToUpdate?:Task;
  activeModal = inject(NgbActiveModal);
  private taskService = inject(TaskService);
  disableButton:boolean;
  
  constructor(){
    this.taskForm = this.createForm();
    this.disableButton = false;
  }

  private createForm(): FormGroup{
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      isCompleted: new FormControl(false),
    })
  }

  closeAndSendData(): void{
    if(this.taskForm.valid){
      this.createTask();
    }
  }

  createTask(){
    this.disableButton = true;
    this.taskService.createTasks(this.taskForm.value)
    .pipe(
      catchError((error) => {
        this.disableButton = false;
        throw error
      })
    )
    .subscribe(
      () => {
        this.disableButton = false;
        this.activeModal.close("La tarea se ha creado exitosamente");
      }
    )
  }

  get title() {
    return this.taskForm.get('title');
  }
  get description() {
    return this.taskForm.get('description');
  }
}
