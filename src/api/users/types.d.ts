interface User {
  id: string;
  userId: number;
  username: string;
  password: string;
  role: string;
  mobileNumber: number;
}

type CreateUserPayload = Omit<user, 'userId'| 'mobileNumber'| 'id'>;
