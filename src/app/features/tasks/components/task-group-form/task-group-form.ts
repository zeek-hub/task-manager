import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-group-form',
  imports: [
    FormsModule
  ],
  templateUrl: './task-group-form.html',
  styleUrl: './task-group-form.css',
})
export class TaskGroupForm {
  @Output() add = new EventEmitter<string>();
  public newGroupName: string = '';
  addGroup(){
    if(this.newGroupName.trim().length < 1) return;
    this.add.emit(this.newGroupName);
  }
}
