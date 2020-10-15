import Router from 'koa-router';
import * as youtubeCtrl from './youtube.ctrl';

const youtube = new Router();

youtube.get('/:context', youtube.search);
youtube.get('/', youtube.mp3);
youtube.get('/', youtube.mp4);

export default youtube;
