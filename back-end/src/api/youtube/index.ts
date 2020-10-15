import Router from 'koa-router';
import * as youtubeCtrl from './youtube.ctrl';

const youtube = new Router();

youtube.get('/search/:context', youtubeCtrl.search);
youtube.get('/mp3', youtubeCtrl.mp3);
youtube.get('/mp4', youtubeCtrl.mp4);

export default youtube;
