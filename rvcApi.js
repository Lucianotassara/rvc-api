require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { bibliaController } from './controller'

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// API
app.use(bibliaController);

function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status);
  res.json({
    status,
    message: err.message,
  });
}

app.use(notFound);
app.use(errorHandler);

const  portBibleApi = process.env.BIBLE_API_PORT || 3002;

app.listen(portBibleApi, () => {
  console.log(`Started successfully server at port ${portBibleApi}`);
  
});
