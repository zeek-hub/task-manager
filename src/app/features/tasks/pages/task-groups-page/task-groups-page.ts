import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TaskGroups} from '../../components/task-groups/task-groups';
import {TaskGroup} from '../../services/task-group';
import {TaskGroupModel} from '../../models/task-group.model';
import {map} from 'rxjs';
import {Task} from '../../services/task';

@Component({
  selector: 'app-task-groups-page',
  imports: [
    TaskGroups
  ],
  templateUrl: './task-groups-page.html',
  styleUrl: './task-groups-page.css',
})
export class TaskGroupsPage implements OnInit {
  public taskGroups: TaskGroupModel[] = [];
  public filter: string = '';

  constructor(private TaskGroupService: TaskGroup, private TaskService: Task, private cdf: ChangeDetectorRef) { }
  ngOnInit() {
    this.loadGroups();
  }
  protected loadGroups() {
    this.TaskGroupService.getGroups().pipe(
      map((groups => this.filterGroups(groups)))
    ).subscribe((data) => {
      this.taskGroups = data;
      this.cdf.detectChanges();
    });
  }
  public addGroup(group: TaskGroupModel) {
    this.TaskGroupService.addGroup(group).subscribe(() => {
      this.loadGroups();
      this.cdf.detectChanges();
    });
  }
  public deleteGroup(id: number) {
    this.TaskService.getTasksByGroup(id).subscribe(tasks => {
      tasks.forEach(task => {
        this.TaskService.deleteTask(task.id!).subscribe({
          next: () => console.log(`Deleted task ${task.id}`),
          error: err => console.error(err),
        })
      })
    })
    this.TaskGroupService.deleteGroup(id).subscribe({
      next: () => {
        console.log(`Deleted group ${id}`);
          this.loadGroups();
        this.cdf.detectChanges();
      },
      error: err => console.error(err)
    });
  }
  public updateGroup(group: TaskGroupModel) {
    this.TaskGroupService.updateGroup(group).subscribe(() => {
      this.loadGroups();
      this.cdf.detectChanges();
    })
  }
  protected filterGroups(groups: TaskGroupModel[]) {
    return groups.filter((group: TaskGroupModel) => group.name.toLowerCase().includes(this.filter.toLowerCase()))
  }

  onDelete($event: number) {
    this.deleteGroup($event);
  }
  onUpdate($event: TaskGroupModel) {
    this.updateGroup($event);
  }
  onSearch($event: string){
    this.filter = $event;
    this.loadGroups();
  }
}
