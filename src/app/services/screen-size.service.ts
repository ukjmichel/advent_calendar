import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  screenWidth = signal<number>(window.innerWidth);

  constructor() {
    // Add a listener for window resize events
    window.addEventListener('resize', this.updateScreenWidth);
  }

  private updateScreenWidth = (): void => {
    // Update the signal value when the window resizes
    this.screenWidth.set(window.innerWidth);
  };

  // Clean up event listener
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateScreenWidth);
  }
}
