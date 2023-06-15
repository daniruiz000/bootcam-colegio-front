import { ClassroomResponse } from "./Classroom";
import { UserResponse } from "./User";

export interface SubjectCreate {
  name: string;
  classroom: string;
  teacher: string;
}

export interface SubjectResponse {
  _id: string;
  name: string;
  classroom: ClassroomResponse;
  teacher: UserResponse;
}
