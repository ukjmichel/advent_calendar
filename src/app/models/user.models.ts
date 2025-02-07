export interface User {
  email: string;
  exp: number;
  iat: number;
  id: string;
  username: string;
}

export interface UsernameResponse {
  message: string;
  username: string;
}
