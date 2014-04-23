var storage = require('../storage');

module.exports = function(options) {
    return function(Class) {
        // TODO: Make it more explicit and less of duck-typing.
        if (!Class.hasOwnProperty('get')) {
            Class.use(storage(options.params));
        }

        Class._id = options.id;

        Class.prototype.fetch = function() {
            return this._request(Class._id, this.params);
        };
    };
};
