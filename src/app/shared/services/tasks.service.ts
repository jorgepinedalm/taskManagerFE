import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Task } from '../models/tasks.model';
import { TaskResponse } from '../models/task-response.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: BehaviorSubject<Task[]>;

    http = inject(HttpClient);

    constructor(){
        this.tasks = new BehaviorSubject<Task[]>([]);
    }

    /**
     * Get tasks
     * @returns 
     */
    getTasks(): Observable<Task[]>{
        if(this.tasks.value.length > 0){
            return this.tasks.asObservable()
        }else{
            return this.http.get<TaskResponse[]>(`${environment.API}api/tasks`)
            .pipe(
                map(tasks => {
                    return tasks.map(task => {
                        const newTask:Task = {
                            id: task.Id,
                            title: task.Title,
                            description: task.Description,
                            isCompleted: task.IsCompleted
                        }
                        return newTask;
                    })
                })
            );
        }
        
    }

    createTasks(task: Task) {
        return this.http.post<any>(`${environment.API}api/tasks`, task)
        .pipe(
            tap( createdTaskId => {
                const tasks = this.tasks.value;
                tasks.push({...task, id: createdTaskId})
                this.tasks.next(tasks);
            })
        );
    }

    updateTask(taskId:number, updatedTask:Task){
        return this.http.put<any>(`${environment.API}api/tasks/${taskId}`, updatedTask).pipe(
            tap( () => {
                const tasks = this.tasks.value;
                const indexFoundTask = tasks.findIndex(task => task.id === taskId);
                if(indexFoundTask > -1){
                    tasks[indexFoundTask] = updatedTask;
                }
                this.tasks.next(tasks);
            })
        );
    }

    removeTask(taskId:number){
        return this.http.delete<null>(`${environment.API}api/tasks/${taskId}`).pipe(
            tap( () => {
                const tasks = this.tasks.value;
                const tasksWithRemove = tasks.filter(task => task.id !== taskId);
                this.tasks.next(tasksWithRemove);
            })
        );
    }
}