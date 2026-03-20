import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {TaskItem} from '../../components/task-item/task-item';
import {TaskForm} from '../../components/task-form/task-form';
import {TaskList} from '../../components/task-list/task-list';
import {Task} from '../../services/task';
import {filter, map} from 'rxjs';

@Component({
  selector: 'app-task-page',
  imports: [
    TaskForm,
    TaskList
  ],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage  implements OnInit {
  public tasks: TaskModel[] = [];
  public filter: String = '';

  constructor(private TaskService: Task, private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadTasks();
  }
  protected loadTasks() {
    this.TaskService.getTasks().pipe(
      map((tasks => tasks.filter(t => t.title.toLowerCase().includes(this.filter.toLowerCase()))
        .map(t => ({
        id: t.id,
        title: t.title,
        status: t.status,
        lastEdit: new Date(t.lastEdit)
      })))),
    ).subscribe((data) => {
      this.tasks = data;
      this.cdf.detectChanges();
    });
  }
  public addTask(title: string) {
    const newTask: TaskModel = {
      id: this.tasks.length + 1,
      title: title,
      status: 'TODO',
      lastEdit: new Date()
    };

    this.TaskService.addTask(newTask).subscribe(() => {
      this.loadTasks();
      this.cdf.detectChanges();
    });
  }
  public deleteTask(id: number) {
    this.TaskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
      this.cdf.detectChanges();
    });
  }
  public updateTask(task: TaskModel) {
    this.TaskService.updateTask(task).subscribe(() => {
      this.loadTasks();
      this.cdf.detectChanges();
    })
  }

  onDelete($event: number) {
    this.deleteTask($event);
  }
  onUpdate($event: TaskModel) {
    this.updateTask($event);
  }
  onSearch($event: string){
    this.filter = $event;
    this.loadTasks();
  }
}
