export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface UserResponse {
  message: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  username: string;
}
