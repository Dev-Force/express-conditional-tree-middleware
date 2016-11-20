import Promise from 'bluebird';
import MiddlewareChainer from '../middleware-chainer';

class OrMiddlewareStrategy {

    execute(req, res, next, app, router, arrayOfOrMiddlewares) { 
        let mappedArray = arrayOfOrMiddlewares.map(function(value, index, array) {
            if(value instanceof MiddlewareChainer) 
                return value.execute(req, res, next, app, router, array[index]);

            return value.applyMiddleware(app)(req, res, next); 
        });
        
        return Promise.any(mappedArray);
     }

}

module.exports = OrMiddlewareStrategy;
