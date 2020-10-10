import Router from 'koa-router';
import ytdl from 'ytdl-core';
import fs from 'fs';

const download = new Router();

download.get('/:context', async (ctx: any) => {
  try {
    let URL = ctx.params;

    ctx.header('Content-Disposition', 'attachment; filename="video.mp3"');

    ytdl(URL, {
      filter: (format) => format.container === 'mp4',
    }).pipe(fs.createWriteStream('video.flv'));

    console.log('Download Success');
  } catch (e) {
    console.log(e);
  }
});

export default download;
