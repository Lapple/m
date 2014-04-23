var _ = require('underscore');
var m = require('../../m');
var Events = require('./events');

function isModel(obj) {
    return obj instanceof m.Model;
}

function isCollection(obj) {
    return obj instanceof m.Collection;
}

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

        if (isCollection(this)) {
            this.on('add', this._onModelAdded);
            this.on('remove', this._onModelRemoved);
        }
    });

    Class.wrap('attr', function(fn, key, value) {
        fn.apply(this, _.tail(arguments));

        if (isModel(this)) {
            this.trigger('change:' + key, this, value);
            this.trigger('change', this);
        }
    });

    Class.wrap('put', function(fn, model, index) {
        fn.apply(this, _.tail(arguments));

        if (isCollection(this)) {
            this.trigger('add', model, this, index);
        }
    });

    Class.wrap('remove', function(fn) {
        var model = fn.apply(this, _.tail(arguments));

        if (isCollection(this)) {
            this.trigger('remove', model, this);
            return model;
        }
    });

    Class.wrap('reset', function(fn) {
        fn.apply(this, _.tail(arguments));

        if (isModel(this)) {
            this.trigger('change', this);
        }

        if (isCollection(this) || isModel(this)) {
            this.trigger('reset', this);
        }
    });
};
