import Joi from 'joi'
import User from '../../models/user'

export const register = async (ctx: any) => {
    const schema = Joi.object().keys({
        usernae: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().alphanum().min(3).max(20).required(),
        nickname: Joi.string().alphanum().min(3).max(20).required()
    });

    const result = Joi.validate(ctx.request.body, schema)
    
    if(result.error) {
        console.log(result.error)
        ctx.status = 400
        ctx.body = result.error
        return; 
    }

    const {username, password, nickname} = ctx.request.body
    try {
        //user 존재여부파악
        const exists = await User.finByUsername(username)
        if(exists) {
            ctx.status = 409
            return
        }

        const user = new User({
            username,
            password,
            nickname
        })

        await user.setPassword(password)
        await user.save()

        //hashed password 파라미터에서 제거
        ctx.body = user.serialize()

        const token = user.generateToken()
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        })
    }catch(e: any) {
        ctx.throw(500, e)
    }
}