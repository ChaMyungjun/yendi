require('dotenv').config()
import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    username: String,
    nickname: String,
    hashedPassword: String
})

UserSchema.methods.setPassword = async function(password: any) {
    const hash = await bcrypt.hash(password, 10)
    this.handledPassword = hash
}

UserSchema.methods.checkPasword = async function(password: any) {
    const result = await bcrypt.compare(password, this.handledPassword)
    return result
}

UserSchema.methods.findByUsername = function(username: any) {
    return this.findOne({username})
}

UserSchema.methods.serialize = function() {
    const data = this.toJSON()
    delete data.hashedPassword
    return data
}

UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        {
            _id: this.id,
            username: this.username,
            nickname: this.nickname
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )
}