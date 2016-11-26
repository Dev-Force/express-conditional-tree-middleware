export function conditionalMiddleware(app, router, rootChainer, errcb) {
    return function(req, res, next) {
        rootChainer.execute(req, res, next, app, router, errcb);
    };
};

export { default as MiddlewareChainer } from './middleware-chainer';
export { default as AndMiddlewareStrategy } from './strategies/and-middleware-strategy';
export { default as OrMiddlewareStrategy } from './strategies/or-middleware-strategy';
