export interface CasesResponse {
  message: string;
  data: CasesData;
}

export interface CasesData {
  _id: string;
  calendarId: string;
  cases: Case[];
  filepath?: string;
  message?: string;
  __v: number;
}

export interface CaseResponse {
  message: string;
  data?: Case;
}

export interface Case {
  number: number;
  state?: CaseState; // "closed" or "open" based on your application's logic
  filePath?: string;
  message?: string;
  _id: string;
}

export type CaseState = 'closed' | 'opened' | 'empty';

export interface UpdateCaseResponse {
  message: string;
  data: {
    _id: string;
    calendarId: string;
    cases: Case[];
    __v: number;
  };
}
