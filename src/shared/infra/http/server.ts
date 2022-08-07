import 'reflect-metadata';
import express from "express";
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes'
import '@shared/container'
import '@shared/infra/typeorm'
import uploadConfig from '../../../config/upload'
import { pagination } from 'typeorm-pagination';
import errorHanddlerMiddleware from '@shared/errors/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());
app.use(pagination)
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);
app.use(errors());
app.use(errorHanddlerMiddleware)

app.listen(3333, () => console.log('Running server on port 3333 🦄'));
