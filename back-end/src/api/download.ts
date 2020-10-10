import Router from 'koa-router';
import ytdl from 'ytdl-core';
import fs from 'fs';

const download = new Router();

//query getting

download.get('/mp4', async (ctx: any) => {
  try {
    let { URL } = ctx.request.query;
    if (!URL) {
      return null;
    } else {
      console.log(URL);
      const success = 'success';

      ctx.set('Content-Disposition', 'attachment; filename="video.mp4"');

      ytdl(URL, {
        filter: (format) => format.container === 'mp4',
        quality: 'highest',
      }).pipe(fs.createWriteStream('video.mp4'));

      console.log(success);

      ctx.body = 'Download Success Video';
      return success;
    }
  } catch (e: any) {
    console.log(e);
  }
});

download.get('/mp3', async (ctx: any) => {
  try {
    let { URL } = ctx.request.query;
    if (!URL) {
      return null;
    } else {
      console.log(URL);
      const success = 'success';

      ctx.set('Context-Disposition', 'attachment; filename="video.mp3"');

      ytdl(URL, {
        filter: (format) => format.container === 'mp4',
        quality: 'highestaudio',
      }).pipe(fs.createWriteStream('audio.mp3'));

      console.log(success);

      ctx.body = 'Download Success Audio';
      return success;
    }
  } catch (e: any) {
    console.log(e);
  }
});

export default download;
