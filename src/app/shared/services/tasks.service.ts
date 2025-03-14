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
     * Get tasks
     * @returns 
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

    createTasks(task: Task) {
        return this.http.post<any>(`${environment.API}api/tasks`, task)
        .pipe(
            tap( createdTaskId => {
                const tasks = this.tasks.value;
                tasks.push({...createdTaskId})
                this.tasks.next(tasks);
            })
        );
    }

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