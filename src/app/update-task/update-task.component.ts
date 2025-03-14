import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, input } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../shared/models/tasks.model';
import { TaskService } from '../shared/services/tasks.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-update-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements AfterViewInit{
  taskForm:FormGroup;
  @Input() taskToUpdate?:Task;
  activeModal = inject(NgbActiveModal);
  private taskService = inject(TaskService);
  disableButton:boolean;
  
  constructor(){
    this.taskForm = this.editForm();
    this.disableButton = false;
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  private editForm(): FormGroup{
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.maxLength(1000)]),
      isCompleted: new FormControl(false),
    })
  }

  private loadData(): void {
    console.log(this.taskToUpdate);
    this.taskForm.patchValue({...this.taskToUpdate})
  }

  closeAndSendData(): void{
    if(this.taskForm.valid){
      this.updateTask();
    }
  }

  updateTask(){
    this.disableButton = true;
    const updatedTask = this.taskForm.value;
    this.taskService.updateTask(this.taskToUpdate?.id ?? 0, {...updatedTask})
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
