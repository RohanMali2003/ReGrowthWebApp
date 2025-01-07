interface Login {
  username: string;
  password: string;
}

type CreateLoginPayload = Login;

interface RefreshToken {
  refreshToken: string;
}

type CreateRefreshTokenPayload = RefreshToken;

interface LoginResponse {
  username: string;
  jwtToken: string;
  refreshToken: string;
  LoggedInState: boolean;
  role: string;
}

type CreateLoginResponse = LoginResponse;