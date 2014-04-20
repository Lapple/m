var _ = require('underscore');
var Model = require('../../m').Model;

module.exports = {
    setUp: function(done) {
        var Song = Model.extend({});

        this.song = new Song().set({
            title: 'Apologize',
            artist: 'Onerepublic'
        });

        done();
    },
    '#get': {
        'returns the originally passed value': function(test) {
            test.equal(this.song.get('artist'), 'Onerepublic');
            test.done();
        },
        'returns `undefined` for unassigned attributes': function(test) {
            test.ok(_.isUndefined(this.song.get('year')));
            test.done();
        }
    },
    '#set': {
        setUp: function(done) {
            this.setResult = this.song.set('year', 2009);
            done();
        },
        tearDown: function(done) {
            delete this.setResult;
            done();
        },
        'updates the assigned key': function(test) {
            test.equal(this.song.get('year'), 2009);
            test.done();
        },
        'returns the instance of the model': function(test) {
            test.equal(this.setResult, this.song);
            test.done();
        }
    }
};
