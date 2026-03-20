import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskItem} from '../task-item/task-item';
import {TaskModel} from '../../models/task.model';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [
    TaskItem,
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  @Input() tasks: TaskModel[] = [];
  @Output() delete= new EventEmitter<number>();
  @Output() update= new EventEmitter<TaskModel>();
  @Output() search = new EventEmitter<string>();
}
