import { Component, inject, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionStatusService } from '../shared/services/connection-status.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  
  private modalService = inject(NgbModal);
  private connectionStatusService = inject(ConnectionStatusService);
  isConnected = true;

  ngOnInit(): void {
    this.listenConnectionStatus();
  }
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

  listenConnectionStatus(): void{
    this.connectionStatusService.getConnectionStatus()
    .subscribe(isConnected => {
      this.isConnected = isConnected;
    })
  }
}
