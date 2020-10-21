import jwt from 'jsonwebtoken';
import User from '../models/user';

const jsonMiddleware = async (ctx: any, next: any) => {
  const token = ctx.cookies.get('access_token');
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
      nickname: decoded.nickname,
    };

    //toeken reloading
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = User.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일 연장
        httpOnly: true,
      });
    }
    return next();
  } catch (e: any) {
    return next();
  }
};

export default jsonMiddleware;
