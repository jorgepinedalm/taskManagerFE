import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Task } from '../models/tasks.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: BehaviorSubject<Task[]>;
    private taskObserver:Observable<Task[]>;

    http = inject(HttpClient);

    constructor(){
        this.tasks = new BehaviorSubject<Task[]>([]);
        this.taskObserver = this.tasks.asObservable();
    }

    /**
     * Get tasks. The first time, get from the server. Then, data get from this service
     * @returns {Observable<Task[]>} List of tasks.
     */
    getTasks(): Observable<Task[]>{
        if(this.tasks.value.length > 0){
            return this.taskObserver
        }else{
            return this.http.get<Task[]>(`${environment.API}api/tasks`).pipe(
                switchMap((tasks) => {
                    this.tasks.next(tasks);
                    return this.taskObserver
                })
            )
        }
        
    }

    /**
     * Add new task. Save the task in local array when response the server
     * @param task data of task to create
     * @returns Observable with task info
     */
    createTask(task: Task) {
        return this.http.post<any>(`${environment.API}api/tasks`, task)
        .pipe(
            tap( createdTaskId => {
                const tasks = this.tasks.value;
                tasks.push({...createdTaskId})
                this.tasks.next(tasks);
            })
        );
    }

    /**
     * Update task data
     * @param taskId id of task to update
     * @param updatedTask updated data of task
     * @returns Observable with no content
     */
    updateTask(taskId:number, updatedTask:Task){
        console.log({taskId});
        return this.http.put<any>(`${environment.API}api/tasks/${taskId}`, updatedTask).pipe(
            tap( () => {
                const tasks = this.tasks.value;
                const indexFoundTask = tasks.findIndex(task => task.id === taskId);
                if(indexFoundTask > -1){
                    tasks[indexFoundTask] = {...updatedTask, id: taskId};
                }
                this.tasks.next(tasks);
            })
        );
    }

    /**
     * Delete task
     * @param taskId id of task to delete
     * @returns Observable with no content
     */
    removeTask(taskId:number){
        console.log({taskId});
        return this.http.delete<null>(`${environment.API}api/tasks/${taskId}`).pipe(
            tap( () => {
                const tasks = this.tasks.value;
                const indexFoundTask = tasks.findIndex(task => task.id === taskId);
                if(indexFoundTask > -1){
                    tasks.splice(indexFoundTask, 1);
                }
                console.log({tasks});
                this.tasks.next(tasks);
            })
        );
    }
}