import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeleteModalService {
  // Signals to track state
  isOpen = signal(false);
  projectId = signal<number | null>(null);
  projectName = signal<string>('');

  // placeholder for the "Confirm" action
  private confirmAction: (() => void) | null = null;

  /**
   * Opens the modal and stores the logic to run
   */
  open(projectId: number, projectName: string, action: () => void) {
    this.projectId.set(projectId);
    this.projectName.set(projectName);
    this.confirmAction = action;
    this.isOpen.set(true);
  }

  /**
   * Called by the 'Execute' button in the Modal Component
   */
  confirm() {
    if (this.confirmAction) {
      this.confirmAction();
    }
    this.close();
  }

  /**
   * Closes the modal and resets state
   */
  close() {
    this.isOpen.set(false);
    this.projectId.set(null);
    this.confirmAction = null;
  }
}
