import Router from 'koa-router';
import ytsr from 'ytsr';

const search = new Router();

search.get('/:context', async (ctx: any) => {
  const result = {
    title: [],
    link: [],
    thumb: [],
    descrip: []
  };

  const { context } = ctx.params;

  if (!context) return (ctx.body = 'Empty Value');

  const data = await ytsr
    .getFilters(context)
    .then(async (filters: any) => {
      const options = {
        limit: 5,
        nextpageRef: filters.get('Type').find((o: any) => o.name === 'Video')
          .ref,
      };
      const res: any = await ytsr(null, options);
      console.log(res);
      for (const keys in res.items) {
        (<any>result.title)[keys] = res.items[keys].title;
        (<any>result.link)[keys] = res.items[keys].link;
        (<any>result.thumb)[keys] = res.items[keys].thumbnail;
        (<any>result.descrip)[keys] = res.items[keys].description
      }
    })
    .catch((err: any) => {
      console.error(err);
    });

  // console.log(result);

  ctx.body = result;
  return result;
});

export default search;
