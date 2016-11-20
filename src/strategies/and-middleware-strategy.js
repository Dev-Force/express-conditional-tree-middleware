import Promise from 'bluebird';
import MiddlewareChainer from '../middleware-chainer';

class AndMiddlewareStrategy {

    execute(req, res, next, app, router, arrayOfAndMiddlewares) {
        return Promise.each(arrayOfAndMiddlewares, function(value, index, length) {
            if(value instanceof MiddlewareChainer) 
                return value.execute(req, res, next, app, router, array[index]);
               
            return value.applyMiddleware(app)(req, res, next);
        });

     }

}

module.exports = AndMiddlewareStrategy;
