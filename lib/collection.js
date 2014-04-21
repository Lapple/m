var _ = require('underscore');
var makeArray = require('./make-array');

var Collection = function() {
    this.models = [];
    this.initialize.apply(this, arguments);
};

_.extend(Collection.prototype, {
    initialize: function() {},
    append: function(models) {
        models = makeArray(models);

        _.each(models, function(model) {
            this.put(model, this.models.length);
        }, this);

        return this.models.length;
    },
    prepend: function(models) {
        models = makeArray(models);

        _.each(models, function(model) {
            this.put(model, 0);
        }, this);

        return this.models.length;
    },
    pop: function() {
        return this.remove(_.last(this.models));
    },
    shift: function() {
        return this.remove(_.first(this.models));
    },
    put: function(model, index) {
        this.models[index] = model;
    },
    remove: function(model) {
        var index = _.indexOf(this.models, model);

        if (index !== -1) {
            this.models.splice(index, 1);

            return model;
        }
    }
});

Collection.wrap = require('./wrap');
Collection.use = require('./use');
Collection.extend = require('./extend');

module.exports = Collection;
