import {ChangeDetectorRef, Injectable} from '@angular/core';
import { TaskModel } from '../models/task.model';
import {catchError, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private apiUrl: string = 'http://localhost:3000/tasks';
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
