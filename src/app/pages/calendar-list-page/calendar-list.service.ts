import { Injectable } from '@angular/core';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class CalendarListService {
  calendars: Calendar[] = [
    {
      id: '1',
      background: 'assets/images/alley.png',
      sender: 'john',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '2',
      background: 'assets/images/morning-light.jpg',
      sender: 'susan',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '3',
      background: 'assets/images/venise.webp',
      sender: 'peter',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '4',
      background: 'assets/images/alley.png',
      sender: 'gabriel',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '5',
      background: 'assets/images/morning-light.jpg',
      sender: 'adrien',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
      id: '6',
      background: 'assets/images/venise.webp',
      sender: 'elsa',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
  ];
}
