var _slice = Array.prototype.slice;

function wrap(fn, wrapper) {
    return function() {
        var args = _slice.call(arguments);

        args.unshift(fn);

        return wrapper.apply(this, args);
    };
}

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
        obj[property] = wrap(obj[property], wrapper);
    }

    return this;
};
