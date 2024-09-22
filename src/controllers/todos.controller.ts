import {PrismaClient} from "@prisma/client";
import {TodoDto} from "../types/todos.types";

export default function useTodosController(db: PrismaClient) {
  async function createTodo(payload: TodoDto) {
    try {
      await db.$connect()

      const todo = await db.todo.create({
        // Prisma неправильно определяет тип, поэтому игнор
        // @ts-ignore
        data: payload,
      })

      await db.$disconnect()
      return todo;
    } catch (error) {
      console.error(error)
      await db.$disconnect()
    }
  }

  async function patchTodo(id: string, payload: TodoDto) {
    try {
      await db.$connect()

      const todo = await db.todo.update({
        where: {
          id: parseInt(id),
        },
        data: payload,
      })

      await db.$disconnect()
      return todo
    } catch(error) {
      console.error(error)
      await db.$disconnect()
    }
  }

  async function deleteTodo(id: string) {
    try {
      await db.$connect()

      const res = await db.todo.delete({
        where: {
          id: parseInt(id),
        }
      });

      await db.$disconnect()
      return res
    } catch (error) {
      console.error(error)
      await db.$disconnect()
    }
  }

  return {
    createTodo,
    deleteTodo,
    patchTodo,
  }
}
