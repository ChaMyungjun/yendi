import Joi from 'joi';
import User from '../../models/user';

export const register = async (ctx: any) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    nickname: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    console.log(result.error);
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password, nickname } = ctx.request.body;
  try {
    //user가 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409;
      return;
    }

    const user = new User({
      username,
      password,
      nickname,
    });

    await user.setPassword(password); //비밀번호 설정
    await user.save(); //비밀번호 저장

    //응답할 데이터에서 hashedpassword 제거
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access-token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 1,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async (ctx: any) => {
  const { username, password } = ctx.request.body;

  //username과 password가 없을 시 에러처리
  if (!username || !password) {
    ctx.status = 401; //Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    //계정이 존재하지 않을시 에러처리
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);

    //비밀번호가 잘못된 경우
    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async (ctx: any) => {
  const { user } = ctx.state;
  console.log({ user });
  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.body = user;
};

export const logout = async (ctx: any) => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
