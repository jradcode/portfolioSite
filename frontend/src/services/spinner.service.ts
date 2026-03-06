import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {
  // isLoading: Controls the Global Overlay (Glass Spinner/Text)
  // for POST, PUT, DELETE actions.
  public readonly isLoading = signal(false);

  // isFetching: Controls the Skeletons in the Project Grid
  // for GET requests.
  public readonly isFetching = signal(false);

  // Methods for the Global Overlay
  show(): void { this.isLoading.set(true); }
  hide(): void { this.isLoading.set(false); }

  // Methods for the Skeletons
  startFetching(): void { this.isFetching.set(true); }
  stopFetching(): void { this.isFetching.set(false); }
}