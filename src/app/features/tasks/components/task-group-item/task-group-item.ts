import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskGroupModel} from '../../models/task-group.model';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-task-group-item',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './task-group-item.html',
  styleUrl: './task-group-item.css',
})
export class TaskGroupItem implements OnInit {
  @Input() group!: TaskGroupModel;
  @Output() delete = new EventEmitter<number>();
  @Output() update= new EventEmitter<TaskGroupModel>();

  ngOnInit() {
    this.updatedName = this.group.name;
  }

  protected isBeingEdited = false;
  public updatedName!: string;
  public SwitchEdit(){
    if(this.isBeingEdited){
      if(this.updatedName.length < 1) return;
      const newGroup:TaskGroupModel = {
        id: this.group.id,
        name: this.updatedName,
      }
      this.update.emit(newGroup);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
}
