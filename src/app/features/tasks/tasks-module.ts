import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TaskPage} from './pages/task-page/task-page';
import {TaskGroupsPage} from './pages/task-groups-page/task-groups-page';

const routes: Routes = [
  { path: '',component: TaskGroupsPage },
  { path: ':groupId', component: TaskPage },
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksModule {}
