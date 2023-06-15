export interface ClassroomCreate {
  name: string;
}

export interface ClassroomResponse extends ClassroomCreate {
  _id: string;
}
