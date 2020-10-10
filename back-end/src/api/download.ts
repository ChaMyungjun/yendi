import Router from 'koa-router';
import ytdl from 'ytdl-core';
import fs from 'fs';

const download = new Router();

download.get('/mp3/:context', async (ctx: any) => {
  try {
    let URL = ctx.params;

    ctx.header('Content-Disposition', 'attachment; filename="video.mp3"');

    ytdl(URL, {
      format: 'mp3'
    }).pipe(ctx);
  } catch (e) {
    console.log(e);
  }
});

export default download;
