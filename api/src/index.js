import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import logger from './lib/logger';
import handleError from './middlewares/handle-error';
import logQuery from './middlewares/log-query';
import postalCodesRouter from './routes/postal-codes';
import locationsRouter from './routes/locations';

const port = process.env.PORT || 4000;

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at: Promise ', promise, reason);
});

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  skip: req => req.connection.remoteAddress === '8.8.8.8',
});

app.use(compression());
app.use(cors());

app.use('*', logQuery);

app.use('/locations', limiter, locationsRouter);
app.get('/postal-codes', limiter, postalCodesRouter);

app.use(handleError);

app.listen(port, () => {
  logger.info(`Express listening on port ${port}`);
});
