import Router from 'koa-router'
import find from './search'

const api = new Router()

api.use('/search', find.routes())

export default api