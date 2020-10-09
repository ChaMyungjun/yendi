import { COPYFILE_EXCL } from 'constants';
import Router from 'koa-router';
import ytdl from 'ytdl-core';
import fs from 'fs';

const download = new Router();

download.get('/mp3/:context', async (ctx: any) => {
  try {
    const context = ctx.params;
    let title = 'audio';
    await ytdl(`${context}`).pipe(fs.createWriteStream('video.flv'));
    console.log('download success');
  } catch (e) {
    console.log(e);
  }
});

export default download;
