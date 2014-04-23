var _ = require('underscore');

module.exports = function(mask) {
    var _store = {};
    var _getKey = getKey.bind(null, _.clone(mask));

    return function(Class) {
        Class.wrap('initialize', function(fn, params) {
            var key = _getKey(params);

            if (_store[key]) {
                throw 'Model with the same parameters already exists. Use static `get` method instead.';
            } else {
                fn.apply(this, _.tail(arguments));

                _store[key] = this;
                this._key = key;
                this.params = _.clone(params);
            }
        });

        Class.get = function(params) {
            return Class.find(params) || new Class(params);
        };

        Class.find = function(params) {
            var key = _getKey(params);

            return _store[key] || null;
        };
    };
};

function getKey(mask, params) {
    return _.reduce(params, function(memo, value, key) {
        if (mask.hasOwnProperty(key)) {
            return memo + (key + '=' + value + '&');
        }

        return memo;
    }, '');
}
