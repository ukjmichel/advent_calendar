import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  models = [
    {
      name: 'alley',
      path: 'assets/images/alley.png',
    },
    {
      name: 'morning-light',
      path: 'assets/images/morning-light.jpg',
    },
    {
      name: 'venise',
      path: 'assets/images/venise.webp',
    },
  ];
}
