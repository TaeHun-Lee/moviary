export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  isActive: boolean = true;
  createdAt: Date = new Date();
}
