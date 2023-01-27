import 'express-async-errors';
import express { Request, Response } from "express";
import cors from 'cors'
import { NextFunction } from 'express';
const app = express();
app.use(cors());
app.use(express.json());

//app.use()