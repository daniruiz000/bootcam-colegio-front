import { ClassroomResponse } from "./Classroom";

// Cuando creemos user los user mandamos las propiedades relacionadas como id y cuando los recibamos se´rn objetos completos

export enum ROL {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  ADMIN = "ADMIN"
}

export interface UserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  classroom?: string;
  children: string[];
  rol: ROL;
}

export interface UserResponse {
  _id: string;
  classroom?: ClassroomResponse;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  children: UserResponse[];
  rol: ROL;
}
