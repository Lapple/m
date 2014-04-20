var _ = require('underscore');

module.exports = function(value) {
    if (!_.isArray(value)) {
        value = [value];
    }

    return value;
};
