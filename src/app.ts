import express, {Express} from 'express';
import dotenv from 'dotenv';
import {db} from './database/db';
import getNotesRouter from "./routes/notes.ts";
import getTodosRouter from "./routes/todos.ts";
import cors from 'cors';

dotenv.config();

export const app: Express = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/notes', getNotesRouter(db));
app.use('/todos', getTodosRouter(db));
