import Router from 'koa-router';
import youtube from './youtube';
import auth from './auth';

const api = new Router();

//api.use('/download', download.routes());
api.use('/youtube', youtube.routes());
api.use('/auth', auth.routes());

export default api;
