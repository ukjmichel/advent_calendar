import { Injectable } from '@angular/core';

interface Calendar {
  id: string;
  background: string;
  sender: string;
  message: string;
  cases: { id: string; state: 'closed' | 'opened' }[];
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
      cases: [
        { id: '1', state: 'opened' },
        { id: '2', state: 'closed' },
        { id: '3', state: 'closed' },
        { id: '4', state: 'closed' },
        { id: '5', state: 'closed' },
        { id: '6', state: 'closed' },
        { id: '7', state: 'closed' },
        { id: '8', state: 'closed' },
        { id: '9', state: 'closed' },
        { id: '10', state: 'closed' },
        { id: '11', state: 'closed' },
        { id: '12', state: 'closed' },
        { id: '13', state: 'closed' },
        { id: '14', state: 'closed' },
        { id: '15', state: 'closed' },
        { id: '16', state: 'closed' },
        { id: '17', state: 'closed' },
        { id: '18', state: 'closed' },
        { id: '19', state: 'closed' },
        { id: '20', state: 'closed' },
        { id: '21', state: 'closed' },
        { id: '22', state: 'closed' },
        { id: '23', state: 'closed' },
        { id: '24', state: 'closed' },
      ],
    },
    {
      id: '2',
      background: 'assets/images/morning-light.jpg',
      sender: 'susan',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      cases: [
        { id: '1', state: 'closed' },
        { id: '2', state: 'closed' },
        { id: '3', state: 'closed' },
        { id: '4', state: 'closed' },
        { id: '5', state: 'closed' },
        { id: '6', state: 'closed' },
        { id: '7', state: 'closed' },
        { id: '8', state: 'closed' },
        { id: '9', state: 'closed' },
        { id: '10', state: 'closed' },
        { id: '11', state: 'closed' },
        { id: '12', state: 'closed' },
        { id: '13', state: 'closed' },
        { id: '14', state: 'closed' },
        { id: '15', state: 'closed' },
        { id: '16', state: 'closed' },
        { id: '17', state: 'closed' },
        { id: '18', state: 'closed' },
        { id: '19', state: 'closed' },
        { id: '20', state: 'closed' },
        { id: '21', state: 'closed' },
        { id: '22', state: 'closed' },
        { id: '23', state: 'closed' },
        { id: '24', state: 'closed' },
      ],
    },
    {
      id: '3',
      background: 'assets/images/venise.webp',
      sender: 'peter',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      cases: [
        { id: '1', state: 'closed' },
        { id: '2', state: 'closed' },
        { id: '3', state: 'closed' },
        { id: '4', state: 'closed' },
        { id: '5', state: 'closed' },
        { id: '6', state: 'closed' },
        { id: '7', state: 'closed' },
        { id: '8', state: 'closed' },
        { id: '9', state: 'closed' },
        { id: '10', state: 'closed' },
        { id: '11', state: 'closed' },
        { id: '12', state: 'closed' },
        { id: '13', state: 'closed' },
        { id: '14', state: 'closed' },
        { id: '15', state: 'closed' },
        { id: '16', state: 'closed' },
        { id: '17', state: 'closed' },
        { id: '18', state: 'closed' },
        { id: '19', state: 'closed' },
        { id: '20', state: 'closed' },
        { id: '21', state: 'closed' },
        { id: '22', state: 'closed' },
        { id: '23', state: 'closed' },
        { id: '24', state: 'closed' },
      ],
    },
    {
      id: '4',
      background: 'assets/images/alley.png',
      sender: 'john',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      cases: [
        { id: '1', state: 'closed' },
        { id: '2', state: 'closed' },
        { id: '3', state: 'closed' },
        { id: '4', state: 'closed' },
        { id: '5', state: 'closed' },
        { id: '6', state: 'closed' },
        { id: '7', state: 'closed' },
        { id: '8', state: 'closed' },
        { id: '9', state: 'closed' },
        { id: '10', state: 'closed' },
        { id: '11', state: 'closed' },
        { id: '12', state: 'closed' },
        { id: '13', state: 'closed' },
        { id: '14', state: 'closed' },
        { id: '15', state: 'closed' },
        { id: '16', state: 'closed' },
        { id: '17', state: 'closed' },
        { id: '18', state: 'closed' },
        { id: '19', state: 'closed' },
        { id: '20', state: 'closed' },
        { id: '21', state: 'closed' },
        { id: '22', state: 'closed' },
        { id: '23', state: 'closed' },
        { id: '24', state: 'closed' },
      ],
    },
    {
      id: '5',
      background: 'assets/images/morning-light.jpg',
      sender: 'susan',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      cases: [
        { id: '1', state: 'closed' },
        { id: '2', state: 'closed' },
        { id: '3', state: 'closed' },
        { id: '4', state: 'closed' },
        { id: '5', state: 'closed' },
        { id: '6', state: 'closed' },
        { id: '7', state: 'closed' },
        { id: '8', state: 'closed' },
        { id: '9', state: 'closed' },
        { id: '10', state: 'closed' },
        { id: '11', state: 'closed' },
        { id: '12', state: 'closed' },
        { id: '13', state: 'closed' },
        { id: '14', state: 'closed' },
        { id: '15', state: 'closed' },
        { id: '16', state: 'closed' },
        { id: '17', state: 'closed' },
        { id: '18', state: 'closed' },
        { id: '19', state: 'closed' },
        { id: '20', state: 'closed' },
        { id: '21', state: 'closed' },
        { id: '22', state: 'closed' },
        { id: '23', state: 'closed' },
        { id: '24', state: 'closed' },
      ],
    },
    {
      id: '6',
      background: 'assets/images/venise.webp',
      sender: 'peter',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      cases: [
        { id: '1', state: 'closed' },
        { id: '2', state: 'closed' },
        { id: '3', state: 'closed' },
        { id: '4', state: 'closed' },
        { id: '5', state: 'closed' },
        { id: '6', state: 'closed' },
        { id: '7', state: 'closed' },
        { id: '8', state: 'closed' },
        { id: '9', state: 'closed' },
        { id: '10', state: 'closed' },
        { id: '11', state: 'closed' },
        { id: '12', state: 'closed' },
        { id: '13', state: 'closed' },
        { id: '14', state: 'closed' },
        { id: '15', state: 'closed' },
        { id: '16', state: 'closed' },
        { id: '17', state: 'closed' },
        { id: '18', state: 'closed' },
        { id: '19', state: 'closed' },
        { id: '20', state: 'closed' },
        { id: '21', state: 'closed' },
        { id: '22', state: 'closed' },
        { id: '23', state: 'closed' },
        { id: '24', state: 'closed' },
      ],
    },
    // Repeat the same for remaining calendars
  ];

  updateCase(calendarId: string, caseId: string) {
    const calendar = this.calendars.find(
      (calendar) => calendar.id === calendarId
    );
    if (calendar) {
      const caseIndex = calendar.cases.findIndex((c) => c.id === caseId);
      if (caseIndex !== -1) {
        calendar.cases[caseIndex].state = 'opened';
      }
    }
  }
}
