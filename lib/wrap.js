var _ = require('underscore');

module.exports = function(property, wrapper) {
    var Class = this;
    var proto = Class.prototype;

    var obj;

    if (Class.hasOwnProperty(property)) {
        obj = Class;
    } else {
        obj = proto;
    }

    if (obj[property]) {
        obj[property] = _.wrap(obj[property], wrapper);
    }

    return this;
};
