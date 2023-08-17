const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, bitFilmsDbPath } = require('./constants');
const { limiter } = require('./middlewares/limiter');

const app = express();
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://r0-0ky.nomoreparties.co',
    'http://r0-0ky.nomoreparties.co',
  ],
  credentials: true,
};

mongoose.connect(bitFilmsDbPath);

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(require('./middlewares/errorHandle'));

app.listen(PORT);
