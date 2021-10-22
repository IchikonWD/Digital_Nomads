import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = Mongoose.Schema({
  nickname: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Date,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: false,
  },
  ocupation: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = Mongoose.model('User', userSchema);

export default User;
