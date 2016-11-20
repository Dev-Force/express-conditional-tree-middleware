import Promise from 'bluebird';

class MiddlewareChainer {

    _strategy;
    _arrayOfMiddlewares = [];
    _root = true;

    constructor(strategy = null) {
        this._strategy = strategy;
    }

    add(middleware) {
        if(middleware instanceof MiddlewareChainer) middleware.root = false; 
        this._arrayOfMiddlewares.push(middleware);
    }

    set root(r) {
        this._root = r;
    }

    get root() {
        return this._root;
    }

    set strategy(strg) {
        this._strategy = strg;
    }

    execute = (req, res, next, app, router, errcb) => {
        if(this.root) {
            return this._strategy.execute(req, res, next, app, router, this._arrayOfMiddlewares, null).then(result => {
                next();
            }).catch(err => {
                errcb(res);
            });
        }
        return this._strategy.execute(req, res, next, app, router, this._arrayOfMiddlewares);
    }

}

module.exports = MiddlewareChainer;