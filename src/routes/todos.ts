import express from "express";
import {PrismaClient} from '@prisma/client';

export default function getTodosRouter(db: PrismaClient) {
  const router = express.Router();

  router.post('/', async (req, res) => {})

  router.put('/:id', async (req, res) => {})

  router.delete('/:id', async (req, res) => {})

  return router;
}