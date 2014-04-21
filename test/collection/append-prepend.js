var _ = require('underscore');
var Model = require('../../m').Model;
var Collection = require('../../m').Collection;

var Song = Model.extend();
var Album = Collection.extend();

module.exports = {
    setUp: function(done) {
        this.apologize = new Song().set({
            title: 'Apologize',
            artist: 'Onerepublic'
        });

        this.tyrant = new Song().set({
            title: 'Tyrant',
            artist: 'Onerepublic'
        });

        done();
    },
    '#append': {
        setUp: function(done) {
            this.albumA = new Album();

            // Accepts array of models.
            this.firstAppendResult = this.albumA.append([
                this.apologize,
                this.tyrant
            ]);

            // Accepts a single model.
            this.albumA.append(this.apologize);
            done();
        },
        tearDown: function(done) {
            this.albumA.reset();
            done();
        },
        'adds passed models to the list of models': function(test) {
            test.equal(this.albumA.models.length, 3);
            test.done();
        },
        'appends models in the given order': function(test) {
            test.equal(this.albumA.models[0].get('title'), 'Apologize');
            test.equal(this.albumA.models[1].get('title'), 'Tyrant');
            test.equal(this.albumA.models[2].get('title'), 'Apologize');
            test.done();
        },
        'returns the current model count': function(test) {
            test.equal(this.firstAppendResult, 2);
            test.done();
        }
    },
    '#prepend': {
        setUp: function(done) {
            this.albumB = new Album();

            // Accepts array of models.
            this.firstPrependResult = this.albumB.prepend([
                this.tyrant,
                this.apologize
            ]);

            // Accepts a single model.
            this.albumB.prepend(this.tyrant);
            done();
        },
        tearDown: function(done) {
            this.albumB.reset();
            done();
        },
        'adds passed models to the list of models': function(test) {
            test.equal(this.albumB.models.length, 3);
            test.done();
        },
        'prepends models in the given order': function(test) {
            test.equal(this.albumB.models[0].get('title'), 'Tyrant');
            test.equal(this.albumB.models[1].get('title'), 'Apologize');
            test.equal(this.albumB.models[2].get('title'), 'Tyrant');
            test.done();
        },
        'returns the current model count': function(test) {
            test.equal(this.firstPrependResult, 2);
            test.done();
        }
    }
};
