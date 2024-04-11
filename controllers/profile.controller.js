const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      message: 'profile fetched successfully',
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
};
