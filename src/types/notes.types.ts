import {TodoDto} from "./todos.types.ts";

export interface NoteDto {
  id?: number;
  title: string;
  todos?: TodoDto[]
}
