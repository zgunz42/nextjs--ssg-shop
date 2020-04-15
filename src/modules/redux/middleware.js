import loggerMiddleware from './middleware/loggerMiddleware';
import thunkMiddleware from './middleware/thunkMiddleware';

const middleware = [
  thunkMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  middleware.push(loggerMiddleware);
}

// define store middlewares as an array
export default middleware;
