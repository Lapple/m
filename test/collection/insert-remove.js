var _ = require('underscore');
var Model = require('../../m').Model;
var Collection = require('../../m').Collection;

var events = require('../../plugins/events');

module.exports = {
    setUp: function(done) {
        var Song = Model.extend({});
        var Album = Collection.extend({});

        Song.use(events);
        Album.use(events);

        this.album = new Album();
        this.song = new Song().set({
            title: 'Apologize',
            artist: 'Onerepublic'
        });

        this.album.append([
            this.song,
            new Song().set({
                title: 'Tyrant',
                artist: 'Onerepublic'
            }),
        ]);

        done();
    },
    '#append': {
        'adds passed models to the list of models': function(test) {
            test.equal(this.album.models.length, 2);
            test.done();
        },
        'appends models in the given order': function(test) {
            // TODO: Getter.
            test.equal(this.album.models[0].get('title'), 'Apologize');
            test.equal(this.album.models[1].get('title'), 'Tyrant');
            test.done();
        },
        'adds models regardless of their inclusion in collection': function(test) {
            this.album.append(this.song);
            test.equal(this.album.models.length, 3);
            test.done();
        }
    }
};
