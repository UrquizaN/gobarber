import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import AppError from './error/AppError';
import uploadConfig from './config/upload';

import './database';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.directory));
server.use(routes);

server.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

server.listen(3333, () => {
  console.log('🚀 Server running on port 3333!');
});
