module.exports = function(value) {
    if (!Array.isArray(value)) {
        value = [value];
    }

    return value;
};
