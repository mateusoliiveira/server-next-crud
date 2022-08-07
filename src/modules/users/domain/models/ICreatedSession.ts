import { IUser } from "./IUser";

export interface ICreatedSession {
  user: IUser;
  token: string;
}
