import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [], // No extra imports needed for a basic CSS spinner
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss'
})
export class Spinner {
  // Inject the service to access the isLoading signal
  protected spinner = inject(SpinnerService);
}
