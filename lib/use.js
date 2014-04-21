module.exports = function(fn) {
    fn(this);
    return this;
};
