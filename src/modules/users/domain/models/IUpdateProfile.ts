export interface IUpdateProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
