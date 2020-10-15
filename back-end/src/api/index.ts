import Router from 'koa-router';
import search from './youtube/search';
import download from './youtube/download';

const api = new Router();

api.use('/download', download.routes());
api.use('/search', search.routes());

export default api;
