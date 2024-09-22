import {TodoDto} from "./todos.types";

export interface NoteDto {
  id?: number;
  title: string;
  todos?: TodoDto[]
}
