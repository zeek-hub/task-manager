import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskPage} from './features/tasks/pages/task-page/task-page';

@Component({
  selector: 'app-root',
  imports: [TaskPage, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-manager');
}
