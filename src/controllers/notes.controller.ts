import {PrismaClient} from "@prisma/client";
import {NoteDto} from "../types/notes.types.ts";

export default function useNotesController(db: PrismaClient) {
  async function getAllNotes() {
    try {
      await db.$connect()
      const noteList = await db.note.findMany({
        include: {
          // Неправильно определяется имя параметра, поэтому игнорирую ошибку
          // @ts-ignore
          todos: {
            take: 3,
          },
        }
      })

      await db.$disconnect()
      return noteList
    } catch (error) {
      console.error(error)
      await db.$disconnect()
    }
  }

  async function getNoteById(id: string) {
    try {
      await db.$connect()
      const note = await db.note.findFirstOrThrow({
        where: {
          id: parseInt(id),
        },
        include: {
          // @ts-ignore
          todos: true,
        }
      })

      await db.$disconnect()
      return note
    } catch (error) {
      console.error(error)
      await db.$disconnect()
    }
  }

  async function createNote(payload: NoteDto) {
    try {
      await db.$connect()

      const notePayload = payload
      delete payload.todos

      const note = await db.note.create({
        data: notePayload,
      })

      await db.$disconnect()
      return note
    } catch (error) {
      console.error(error)
      await db.$disconnect()
    }
  }

  async function patchNote(id: string, payload: NoteDto) {
    try {
      await db.$connect()

      const notePayload = payload
      delete notePayload.todos;

      const note = await db.note.update({
        where: {
          id: parseInt(id),
        },
        data: notePayload,
      });

      await db.$disconnect()
      return note
    } catch(error) {
      console.error(error)
      await db.$disconnect()
    }
  }

  async function deleteNote(id: string) {
    try {
      await db.$connect()

      await db.todo.deleteMany({
        where: {
          noteId: parseInt(id)
        }
      })
      const res = await db.note.delete({
        where: {
          id: parseInt(id)
        }
      })

      await db.$disconnect()
      return res
    } catch (error) {
      console.error(error)
      await db.$disconnect()
    }
  }

  return {
    getAllNotes,
    getNoteById,
    createNote,
    patchNote,
    deleteNote,
  }
}
