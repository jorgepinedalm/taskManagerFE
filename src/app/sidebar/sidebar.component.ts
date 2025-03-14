import { Component, inject } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private modalService = inject(NgbModal);

  /**
   * Open create task modal
   */
  openCreateTaskForm() {
    const modalRef = this.modalService.open(CreateTaskComponent);
    modalRef.result.then(
      (result) => {
        console.log({result});
      }
    )
  }
}
