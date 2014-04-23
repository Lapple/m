var Model = function() {
    this._attrs = {};
    this.initialize.apply(this, arguments);
};

Model.prototype = {
    initialize: function() {},

    set: function(key, value) {
        var attrs;

        if (typeof key === 'object') {
            attrs = key;
        } else {
            (attrs = {})[key] = value;
        }

        Object.keys(attrs).forEach(function(key) {
            this.attr(key, attrs[key]);
        }, this);

        return this;
    },
    attr: function(key, value) {
        this._attrs[key] = value;
    },
    get: function(key) {
        return this._attrs[key];
    },
    reset: function() {
        this._attrs = {};
    }
};

Model.wrap = require('./wrap');
Model.use = require('./use');
Model.extend = require('./extend');

module.exports = Model;
