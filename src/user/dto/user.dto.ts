export class CreateUserDTO {
  email: string;

  password: string;

  firstName: string;

  lastName: string;
}

export class LoginUserDTO {
  email: string;
  password: string;
}
