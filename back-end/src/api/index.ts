import Router from 'koa-router';
import youtube from './youtube'

const api = new Router();

//api.use('/download', download.routes());
api.use('/youtube', youtube.routes());

export default api;
