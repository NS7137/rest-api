import mongoose from 'mongoose';
import config from 'config';
import log from '../logger';

const pwd = config.get('password') as string;
const dbUri = config.get('dbUri') as string;
const DB = dbUri.replace('<PASSWORD>', pwd) as string;

const connect = async () => {
  return await mongoose
    .connect(DB)
    .then(() => {
      log.info('Database connected');
    })
    .catch(err => {
      log.error('db error', err);
      process.exit(1);
    });
};

export default connect;
