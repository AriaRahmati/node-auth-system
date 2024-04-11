const userModel = require('../models/user.model');

const checkAuth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization.split(' ')[1];

    const decodedData = userModel.verifyToken(bearerToken);
    if (!decodedData) {
      throw { statusCode: 401, message: 'not authorized to access this route' };
    }

    const user = await userModel.findById(decodedData.id).select('-__v -password');
    if (!user) {
      throw { statusCode: 404, message: 'user not found' };
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkAuth;
