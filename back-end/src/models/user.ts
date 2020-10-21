import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  nickname: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password: any) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password: any) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.statics.findByUsername = function (username: any) {
  return this.findOne({ username });
};

UserSchema.methods.serialize = function () {s
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    //첫 번째 파라미터는 토큰값
    {
      _id: this.id,
      username: this.username,
      nickname: this.nickname,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
