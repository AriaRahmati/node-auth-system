const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const notFoundError = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');
const router = require('./routes/index.routes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use('*', notFoundError);
app.use(errorHandler);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log('Connected to database successfully');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
