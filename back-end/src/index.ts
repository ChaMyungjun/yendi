import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import api from './api';

const { PORT, MONGO_URI } = process.env;

const app = new Koa();
const router = new Router();

mongoose
  .connect('mongodb://localhost:27017/yendi', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connect to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

//Router setting
router.use('/api', api.routes());

app.use(cors());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log('Listening to port 4000');
});
