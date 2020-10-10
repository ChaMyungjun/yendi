import Router from 'koa-router';
import ytdl from 'ytdl-core';
import fs from 'fs';

const download = new Router();

download.get('/mp4', async (ctx: any) => {
  try {
    let { URL } = ctx.request.query;
    if (!URL) {
      return null;
    } else {
      console.log(URL);
      const success = 'success';

      ctx.set('Content-Disposition', 'attachment; filename="video.mp3"');

      ytdl(URL, {
        filter: (format) => format.container === 'mp4',
      }).pipe(fs.createWriteStream('video.flv'));

      console.log(success);

      ctx.body = 'Download Success';
      return success;
    }
  } catch (e: any) {
    console.log(e);
  }
});

export default download;
