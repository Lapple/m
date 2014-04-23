var _ = require('underscore');
var m = require('../../m');
var Events = require('./events');

var Model = m.Model;
var Collection = m.Collection;

module.exports = function(Class) {
    _.extend(Class.prototype, Events, {
        _onModelAdded: function(model) {
            model.on('all', this._onModelEvent, this);
        },
        _onModelRemoved: function(model) {
            model.off('all', this._onModelEvent, this);
        },
        _onModelEvent: function(event, model, collection) {
            if ((event === 'add' || event === 'remove') && collection !== this) {
                return;
            }

            if (event === 'destroy') {
                this.remove(model);
            }

            this.trigger.apply(this, arguments);
        }
    });

    Class.wrap('initialize', function(fn) {
        fn.apply(this, _.tail(arguments));

        if (this instanceof Collection) {
            this.on('add', this._onModelAdded);
            this.on('remove', this._onModelRemoved);
        }
    });

    Class.wrap('attr', function(fn, key, value) {
        fn.apply(this, _.tail(arguments));

        if (this instanceof Model) {
            this.trigger('change:' + key, this, value);
            this.trigger('change', this);
        }
    });

    Class.wrap('put', function(fn, model, index) {
        fn.apply(this, _.tail(arguments));

        if (this instanceof Collection) {
            this.trigger('add', model, this, index);
        }
    });

    Class.wrap('remove', function(fn) {
        var model = fn.apply(this, _.tail(arguments));

        if (model && this instanceof Collection) {
            this.trigger('remove', model, this);
            return model;
        }
    });
};
