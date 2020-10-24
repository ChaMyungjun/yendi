import ytdl from 'ytdl-core';
import ytsr from 'ytsr';
import fs from 'fs';

export const search = async (ctx: any, next: any) => {
  // const result = {
  //   title: [],
  //   link: [],
  //   thumb: [],
  //   descrip: [],
  // };
  // let search_result = null;

  // let { context } = ctx.params;

  // console.log(context);

  // if (!context) {
  //   return null;
  // } else {
  //   // const data = await ytsr
  //   //   .getFilters(context)
  //   //   .then(async (filters: any) => {
  //   //     const options = {
  //   //       limit: 5,
  //   //       nextpageRef: filters.get('Type').find((o: any) => o.name === 'Video')
  //   //         .ref,
  //   //     };
  //   //     const res: any = await ytsr(null, options);
  //   //     console.log(res);
  //   //     for (const keys in res.items) {
  //   //       (<any>result.title)[keys] = res.items[keys].title;
  //   //       (<any>result.link)[keys] = res.items[keys].link;
  //   //       (<any>result.thumb)[keys] = res.items[keys].thumbnail;
  //   //       (<any>result.descrip)[keys] = res.items[keys].description;
  //   //     }
  //   //   })
  //   //   .catch((err: any) => {
  //   //     console.error(err);
  //   //   });

  //   await ytsr.getFilters(context).then(async (filters: any) => {
  //     const options = {
  //       limit: 5,
  //       nextpageRef: filters.get('Type').find((o: any) => o.name === 'Video'),
  //     };
  //     search_result = await ytsr(null, options);
  //     console.log(result);
  //   });
  //   return search_result;
  // }

  try {
    let { context } = ctx.params;
    if (!context) {
      return null;
    } else {
      console.log(context);
      ytsr
        .getFilters(context)
        .then(async (filters: any) => {
          const result = await ytsr(null, {
            limit: 5,
            nextpageRef: filters
              .get('Type')
              .find((o: any) => o.name === 'Video').ref,
          });
          console.log(result);
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
  } catch (e: any) {
    console.log(e);
  }
};

export const mp3 = async (ctx: any, next: any) => {
  try {
    let { URL } = ctx.request.query;
    if (!URL) {
      return null;
    } else {
      console.log(URL);
      const success = 'Download Success Audio';

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
};

export const mp4 = async (ctx: any, next: any) => {
  try {
    let { URL } = ctx.request.query;
    if (!URL) {
      return null;
    } else {
      console.log(URL);
      const success = 'Download Success Video';

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
};
