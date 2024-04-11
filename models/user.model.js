const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(15);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
  const payload = {
    id: this._id,
    email: this.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
  return token;
};

userSchema.statics.verifyToken = function (token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};


const userModel = model('User', userSchema);

module.exports = userModel;
