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


const  portBibleApi = process.env.BIBLE_API_PORT || 3002;

app.listen(portBibleApi, () => {
  console.log(`Started successfully server at port ${portBibleApi}`);
  
});
