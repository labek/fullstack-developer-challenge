import compression from 'compression';
import cors from 'cors';
import express from 'express';
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

app.use(compression());
app.use(cors());

app.use('*', logQuery);

app.use('/locations', locationsRouter);
app.get('/postal-codes', postalCodesRouter);

app.use(handleError);

app.listen(port, () => {
  logger.info(`Express listening on port ${port}`);
});
