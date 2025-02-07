export interface CalendarsResponse {
  message: string;
  data: Calendar[];
}
export interface CalendarResponse {
  message: string;
  data: Calendar;
}
export interface Calendar {
  id: string;
  senderId: string;
  receiver: string;
  message: string;
  created_at: string; // ISO date string
  image_path: string | null; // Nullable
}

export interface CasesData {
  _id: string;
  calendarId: string;
  cases: Case[];
  filepath?: string;
  message?: string;
  __v: number;
}

export interface Case {
  number: number;
  state?: CaseState; // "closed" or "open" based on your application's logic
  filePath?: string;
  message?: string;
  _id: string;
}

export type CaseState = 'closed' | 'opened' | 'empty';
