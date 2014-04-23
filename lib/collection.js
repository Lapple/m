var makeArray = require('./make-array');

var Collection = function() {
    this.models = [];
    this.initialize.apply(this, arguments);
};

var Prototype = Collection.prototype;

Prototype.initialize = function() {};

Prototype.append = function(models) {
    models = makeArray(models);

    models.forEach(function(model) {
        this.put(model, this.models.length);
    }, this);

    return this.models.length;
};

Prototype.prepend = function(models) {
    models = makeArray(models);

    models.forEach(function(model) {
        this.put(model, 0);
    }, this);

    return this.models.length;
};

Prototype.put = function(model, index) {
    this.models.splice(index, 0, model);
};

Prototype.remove = function(model) {
    var index = this.models.indexOf(model);

    if (index !== -1) {
        this.models.splice(index, 1);

        return model;
    }
};

Prototype.reset = function() {
    this.models.slice().forEach(this.remove, this);
};

Collection.wrap = require('./wrap');
Collection.use = require('./use');
Collection.extend = require('./extend');

module.exports = Collection;
