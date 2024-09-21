import express from "express";
import {PrismaClient} from '@prisma/client';
import useTodosController from "../controllers/todos.controller.ts";

export default function getTodosRouter(db: PrismaClient) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const data = await useTodosController(db).createTodo(req.body)
    res.json(data)
  })

  router.patch('/:id', async (req, res) => {
    const data = await useTodosController(db).patchTodo(req.params.id, req.body);
    res.json(data)
  })

  router.delete('/:id', async (req, res) => {
    const data = await useTodosController(db).deleteTodo(req.params.id)
    res.json(data);
  })

  return router;
}