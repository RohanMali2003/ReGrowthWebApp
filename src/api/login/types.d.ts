interface Login {
  username: string;
  password: string;
  jwtToken: string;
}

type CreateLoginPayload = Omit<Login, 'jwtToken'>;
