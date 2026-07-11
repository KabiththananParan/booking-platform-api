export class AuthResponseDto {
  readonly accessToken!: string;

  readonly user!: {
    id: number;
    name: string;
    email: string;
  };
}