import {ChangeDetectorRef, Injectable} from '@angular/core';
import { TaskModel } from '../models/task.model';
import {catchError, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Task {
  //local url - http://localhost:3000/tasks
  //mockAPI url - https://69bd3bee2bc2a25b22ae00b9.mockapi.io/api/v1/tasks
  private apiUrl: string = 'https://69bd3bee2bc2a25b22ae00b9.mockapi.io/api/v1/tasks';

  constructor(private http: HttpClient) { }
  getTasks() {
    return this.http.get<TaskModel[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('ERROR: ' + err);
        return throwError(() => err);
      })
    )
  }
  addTask(task: TaskModel) {
    return this.http.post<TaskModel>(this.apiUrl, task);
  }
  updateTask(task: TaskModel) {
    return this.http.put<TaskModel>(`${this.apiUrl}/${task.id}`, task);
  }
  deleteTask(taskId: number) {
    return this.http.delete<TaskModel>(`${this.apiUrl}/${taskId}`);
  }
}
