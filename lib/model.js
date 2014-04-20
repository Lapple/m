var _ = require('underscore');

var Model = function() {
    this._attrs = {};
    this.initialize.apply(this, arguments);
};

_.extend(Model.prototype, {
    initialize: function() {},

    set: function(key, value) {
        var attrs;

        if (_.isObject(key)) {
            attrs = key;
        } else {
            (attrs = {})[key] = value;
        }

        _.each(attrs, function(value, key) {
            this.attr(key, value);
        }, this);

        return this;
    },
    attr: function(key, value) {
        this._attrs[key] = value;
    },
    get: function(key) {
        return this._attrs[key];
    }
});

Model.extend = require('./extend');

module.exports = Model;
