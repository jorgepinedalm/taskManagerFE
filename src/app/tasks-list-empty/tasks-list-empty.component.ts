import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tasks-list-empty',
  imports: [],
  templateUrl: './tasks-list-empty.component.html',
  styleUrl: './tasks-list-empty.component.css'
})
export class TasksListEmptyComponent {
  message = input('');
}
