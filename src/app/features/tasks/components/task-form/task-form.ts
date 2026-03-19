import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  @Output() addTask= new EventEmitter<string>();
  public title: string = '';
  public add(){
    if(this.title.trim().length < 3) return;
    this.addTask.emit(this.title);
    console.log(this.title);
  }
}
