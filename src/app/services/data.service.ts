import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  models = [
    {
      name: 'alley',
      path: 'images/alley.png',
    },
    {
      name: 'morning-light',
      path: 'images/morning-light.jpg',
    },
    {
      name: 'venise',
      path: 'images/venise.webp',
    },
  ];
}
