var Model = function() {
    this._attrs = {};
    this.initialize.apply(this, arguments);
};

var Prototype = Model.prototype;

Prototype.initialize = function() {};

Prototype.set = function(key, value) {
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
};

Prototype.attr = function(key, value) {
    this._attrs[key] = value;
};

Prototype.get = function(key) {
    return this._attrs[key];
};

Model.wrap = require('./wrap');
Model.use = require('./use');
Model.extend = require('./extend');

module.exports = Model;
