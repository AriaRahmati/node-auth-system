const notFoundError = (req, res, next) => {
  res.send({
    statusCode: 404,
    message: 'Not Found',
  });
};

module.exports = notFoundError;
