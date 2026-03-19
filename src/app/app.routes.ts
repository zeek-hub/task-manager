import { Routes } from '@angular/router';
import { TaskPage } from './features/tasks/pages/task-page/task-page';

export const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/tasks/tasks-module').then(m => m.TasksModule)
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];
