import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskGroupForm} from '../task-group-form/task-group-form';
import {TaskGroupModel} from '../../models/task-group.model';
import {NgForOf} from '@angular/common';
import {TaskGroupItem} from '../task-group-item/task-group-item';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-task-groups',
  imports: [
    TaskGroupForm,
    NgForOf,
    TaskGroupItem,
    RouterLink
  ],
  templateUrl: './task-groups.html',
  styleUrl: './task-groups.css',
})
export class TaskGroups {
  @Input() taskGroups: TaskGroupModel[] = [];
  @Output() add = new EventEmitter<TaskGroupModel>();
  @Output() search = new EventEmitter<string>();
  @Output() delete  = new EventEmitter<number>();
  @Output() update = new EventEmitter<TaskGroupModel>();
  public onAdd($event: string) {
    const newGroup = {
      id: this.taskGroups.length + 1,
      name: $event
    }
    this.add.emit(newGroup);
  }
}
