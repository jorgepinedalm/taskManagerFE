import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../shared/models/tasks.model';
import { TaskService } from '../shared/services/tasks.service';
import { catchError, Subscription } from 'rxjs';

@Component({
  selector: 'app-update-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements AfterViewInit, OnDestroy{
  taskForm:FormGroup;
  @Input() taskToUpdate?:Task;
  activeModal = inject(NgbActiveModal);
  private taskService = inject(TaskService);
  disableButton:boolean;
  subscription:Subscription;
  
  constructor(){
    this.taskForm = this.editForm();
    this.disableButton = false;
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  /**
   * Create the form
   * @returns form to edit task
   */
  private editForm(): FormGroup{
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      isCompleted: new FormControl(false),
    })
  }

  /**
   * Load data of task in form
   */
  private loadData(): void {
    console.log(this.taskToUpdate);
    this.taskForm.patchValue({...this.taskToUpdate})
  }

  /**
   * Call update task method is form is valid
   */
  closeAndSendData(): void{
    if(this.taskForm.valid){
      this.updateTask();
    }
  }

  /**
   * Update task. 
   * Disable button while the request is sending and notify when close the modal
   */
  updateTask(){
    this.disableButton = true;
    const updatedTask = this.taskForm.value;
    this.subscription = this.taskService.updateTask(this.taskToUpdate?.id ?? 0, {...updatedTask})
    .pipe(
      catchError((error) => {
        this.disableButton = false;
        throw error
      })
    )
    .subscribe(
      () => {
        this.disableButton = false;
        this.activeModal.close("La tarea se ha modificado exitosamente");
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
