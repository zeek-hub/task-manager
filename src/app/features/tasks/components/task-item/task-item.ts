import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskModel} from '../../models/task.model';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem implements OnInit {
  @Input() task!: TaskModel;
  @Output() delete= new EventEmitter<number>();
  @Output() update= new EventEmitter<TaskModel>();
  public readonly allowedStatuses: string[] = ['TODO', 'In-Progress', 'Done'];
  public updatedTitle!: string;
  public updatedStatus!: string;
  public isBeingEdited= false;

  ngOnInit() {
    this.updatedTitle = this.task.title;
    this.updatedStatus = this.task.status;
  }

  public SwitchEdit(){
    if(this.isBeingEdited){
      if(this.updatedTitle.length < 3) return;
      if(!this.allowedStatuses.includes(this.updatedStatus as any)) return;
      const newTask:TaskModel = {
        id: this.task.id,
        title: this.updatedTitle,
        status: this.updatedStatus as 'TODO' | 'In-Progress' | 'Done',
        lastEdit: new Date(),
        groupId: this.task.groupId
      }
      this.update.emit(newTask);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
  public getStatusClass(){
    switch(this.task.status){
      case 'TODO':
        return 'status-todo';
      case 'In-Progress':
        return 'status-in-progress';
      case 'Done':
        return 'status-done';
      default:
        return '';
    }
  }
  public getTaskFullDate(){
    const date = this.task.lastEdit;
    return `
    ${date.getDate().toString().padStart(2, '0')}
    - ${(date.getMonth() + 1).toString().padStart(2, '0')}
    - ${date.getFullYear()} |
     ${date.getHours().toString().padStart(2, '0')}
     : ${date.getMinutes().toString().padStart(2, '0')}
     : ${date.getSeconds().toString().padStart(2, '0')}`;
  }
}
