import Router from 'koa-router';
import ytdl from 'ytdl-core';
import fs from 'fs';

const download = new Router();

download.get('/', async (ctx: any) => {
  try {
    let URL = 'http://www.youtube.com/watch?v=A02s8omM_hI';
    const success = 'success';

    ctx.set('Content-Disposition', 'attachment; filename="video.mp3"');

    ytdl(URL, {
      filter: (format) => format.container === 'mp4',
    }).pipe(fs.createWriteStream('video.flv'));

    console.log(success);

    ctx.body = 'Download Success';
    return success;
  } catch (e: any) {
    console.log(e);
  }
});

export default download;
