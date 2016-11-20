module.exports = function(app, router, rootChainer, errcb) {
    return function(req, res, next) {
        rootChainer.execute(req, res, next, app, router, errcb);
    };
};
