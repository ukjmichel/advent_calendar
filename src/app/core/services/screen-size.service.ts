import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  screenWidth = signal<number>(window.innerWidth); // Signal for screen width
  isSmallScreen = computed(() => this.screenWidth() < 1280); // Computed property for small screens

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
