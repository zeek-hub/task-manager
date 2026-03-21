import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskGroupModel} from '../models/task-group.model';
import {catchError, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskGroup {
  //local url - http://localhost:3000/tasks
  //mockAPI url - https://69bd3bee2bc2a25b22ae00b9.mockapi.io/api/v1/tasks
  private apiUrl: string = 'https://69bd3bee2bc2a25b22ae00b9.mockapi.io/api/v1/taskGroups';

  constructor(private http: HttpClient) { }
  getGroups() {
    return this.http.get<TaskGroupModel[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('ERROR: ' + err);
        return throwError(() => err);
      })
    )
  }
  addGroup(group: TaskGroupModel) {
    return this.http.post<TaskGroupModel>(this.apiUrl, group);
  }
  updateGroup(group: TaskGroupModel) {
    return this.http.put<TaskGroupModel>(`${this.apiUrl}/${group.id}`, group);
  }
  deleteGroup(groupId: number) {
    return this.http.delete<TaskGroupModel>(`${this.apiUrl}/${groupId}`);
  }
}
