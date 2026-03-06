import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalService } from '../../../services/delete-modal.service'; // check your path

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss'
})
export class DeleteModal {
  // Injecting the service so the HTML can see the signals
  protected modalService = inject(DeleteModalService);

  onAbort() {
    this.modalService.close();
  }

  onExecute() {
    this.modalService.confirm();
  }
}