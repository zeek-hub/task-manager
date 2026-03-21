import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {TaskForm} from '../../components/task-form/task-form';
import {TaskList} from '../../components/task-list/task-list';
import {Task} from '../../services/task';
import {map} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TaskGroupModel} from '../../models/task-group.model';

@Component({
  selector: 'app-task-page',
  imports: [
    TaskForm,
    TaskList,
    RouterLink
  ],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage  implements OnInit {
  public groupId!: number;
  public tasks: TaskModel[] = [];
  public filter: String = '';

  constructor(private TaskService: Task, private cdf: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = Number(params.get('groupId'));
      this.loadTasks(this.groupId);
    });
  }
  protected loadTasks(groupId: number) {
    this.TaskService.getTasksByGroup(groupId).pipe(
      map((tasks => this.sortTasks(this.mapTasks(this.filterTasks(tasks)))))
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
      lastEdit: new Date(),
      groupId: this.groupId,
    };

    this.TaskService.addTask(newTask).subscribe(() => {
      this.loadTasks(this.groupId);
      this.cdf.detectChanges();
    });
  }
  public deleteTask(id: number) {
    this.TaskService.deleteTask(id).subscribe(() => {
      this.loadTasks(this.groupId);
      this.cdf.detectChanges();
    });
  }
  public updateTask(task: TaskModel) {
    this.TaskService.updateTask(task).subscribe(() => {
      this.loadTasks(this.groupId);
      this.cdf.detectChanges();
    })
  }
  protected filterTasks(tasks: TaskModel[]) {
    return tasks.filter(t => t.title.toLowerCase().includes(this.filter.toLowerCase()))
  }
  protected mapTasks(tasks: TaskModel[]) {
    return tasks.map(t => ({
      ...t,
      lastEdit: new Date(t.lastEdit),
      groupId: this.groupId,
    }))
  }
  protected sortTasks(tasks: TaskModel[]) {
    return tasks.sort((a: TaskModel, b: TaskModel) => a.title.localeCompare(b.title))
  }

  onDelete($event: number) {
    this.deleteTask($event);
  }
  onUpdate($event: TaskModel) {
    this.updateTask($event);
  }
  onSearch($event: string){
    this.filter = $event;
    this.loadTasks(this.groupId);
  }
}
