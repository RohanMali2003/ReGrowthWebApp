interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
  mobileNumber?: number;
}

type CreateUserPayload = Omit<User, 'userId'>;
