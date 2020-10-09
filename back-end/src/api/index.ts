import Router from 'koa-router';
import search from './search';
import download from './download';

const api = new Router();

api.use('/download', download.routes());
api.use('/search', search.routes());

export default api;
