import express from "express";
import {PrismaClient} from '@prisma/client';
import useNotesController from "../controllers/notes.controller.ts";

export default function getNotesRouter(db: PrismaClient) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const data = await useNotesController(db).getAllNotes()
    res.json(data)
  })

  router.get('/:id', async (req, res) => {
    const data = await useNotesController(db).getNoteById(req.params.id)
    res.json(data)
  })

  router.post('/', async (req, res) => {
    const data = await useNotesController(db).createNote(req.body)
    res.json(data)
  })

  router.patch('/:id', async (req, res) => {
    const data = await useNotesController(db).patchNote(req.params.id, req.body)
    res.json(data)
  })

  router.delete('/:id', async (req, res) => {
    const data = await useNotesController(db).deleteNote(req.params.id);
    res.json(data);
  })

  return router;
}
