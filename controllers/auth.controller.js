const userModel = require('../models/user.model');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      throw { statusCode: 404, message: 'user not found' };
    }

    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) {
      throw { statusCode: 404, message: 'invalid credentials' };
    }

    const token = user.generateToken();

    res.status(200).json({
      message: 'login successful',
      token,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const newUser = await userModel.create({ fullName, email, password });

    res.status(201).json({ message: 'user created successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
