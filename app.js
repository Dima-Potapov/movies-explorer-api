const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const cors = require('cors');
const {
  errors,
} = require('celebrate');
const { errorHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const limiter = require('./utils/rateLimit');

const { PORT = 3001, MONGODB_URL } = process.env;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://dimap.domainname.student.nomoredomains.rocks',
    'https://dimap.domainname.student.nomoredomains.rocks',
  ],
  credentials: true,
};

app.use(requestLogger);
app.use(helmet());
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   const { origin } = req.headers;
//
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//
//   next();
// });
app.use(limiter);

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
