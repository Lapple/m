var _ = require('underscore');

var BASE_VERSION = 1;

module.exports = function(Class) {
    var update = function(fn) {
        fn.apply(this, _.tail(arguments));
        this.version++;
    };

    Class.wrap('initialize', function(fn) {
        fn.apply(this, _.tail(arguments));
        this.version = BASE_VERSION;
    });

    Class.wrap('attr', update);
    Class.wrap('put', update);
    Class.wrap('remove', update);
};
