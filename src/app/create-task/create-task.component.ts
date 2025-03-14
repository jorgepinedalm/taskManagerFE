import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../shared/models/tasks.model';
import { TaskService } from '../shared/services/tasks.service';
import { catchError, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnDestroy{
  taskForm:FormGroup;
  @Input() taskToUpdate?:Task;
  activeModal = inject(NgbActiveModal);
  private taskService = inject(TaskService);
  disableButton:boolean;
  subscription:Subscription;
  
  constructor(){
    this.taskForm = this.createForm();
    this.disableButton = false;
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): FormGroup{
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      isCompleted: new FormControl(false),
    })
  }

  /**
   * Call create task method if the form is valid
   */
  closeAndSendData(): void{
    if(this.taskForm.valid){
      this.createTask();
    }
  }

  /**
   * Create task.
   * Disable button while the server send data and notify when close modal
   */
  createTask(){
    this.disableButton = true;
    this.subscription = this.taskService.createTask(this.taskForm.value)
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
