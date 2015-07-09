function solve() {
    var module = (function() {
        var player,
            playlist,
            playable,
            audio,
            video,
            validator,
            CONSTANTS;

        CONSTANTS = {
            TEXT_MIN_LENGTH: 3,
            TEXT_MAX_LENGTH: 25,
            IMDB_MIN_RATING: 1,
            IMDB_MAX_RATING: 5,
        };

        validator = {
            validateIfUndefined: function(val, name) {
                if (val === undefined) {
                    throw new Error(name + ' cannot be undefined');
                }
            },

            validateString: function(val, name) {
                name = name || 'Value';
                this.validateIfUndefined(val, name);

                if (typeof(val) !== 'string') {
                    throw new Error(name + ' must be string');
                }

                if (val.length < CONSTANTS.TEXT_MIN_LENGTH || val.length > CONSTANTS.TEXT_MAX_LENGTH) {
                    throw new Error(name + ' must be between ' + CONSTANTS.TEXT_MIN_LENGTH + ' and' + CONSTANTS.TEXT_MAX_LENGTH + ' symbols');
                }
            },

            validateIfNumber: function(val, name) {
                if (typeof(val) !== 'number') {
                    throw new Error(name + ' must be a number');
                }
            },

            validatePositiveNumber: function(val, name) {
                this.validateIfUndefined(val, name);
                this.validateIfNumber(val, name);

                if (val <= 0) {
                    throw new Error(val + ' must be a positive number');
                }
            },

            validateImdbRating: function(val) {
                this.validateIfUndefined(val, 'IMDB Rating');
                if (val < CONSTANTS.IMDB_MIN_RATING || val > CONSTANTS.IMDB_MAX_RATING) {
                    throw new Error('IMDB Rating must be between' + CONSTANTS.IMDB_MIN_RATING + ' and ' + CONSTANTS.IMDB_MAX_RATING);
                }
            }

        };

        player = (function() {
            var currentPlayerId = 0,
                player = Object.create({});

            Object.defineProperty(player, 'init', {
                value: function(name) {
                    this.name = name;
                    this._id = ++currentPlayerId;
                    return this;
                }
            });

            Object.defineProperty(player, 'name', {
                get: function() {
                    this._name;
                },

                set: function(val) {
                    validator.validateIfUndefined(val, 'Player name');
                    validator.validateString(val, 'Player name');
                    this._name = val;
                }
            });

            return player;
        }());

        playlist = (function() {
            var currentPlaylistId = 0,
                playlist = Object.create({});

            Object.defineProperty(playlist, 'init', {
                value: function(name) {
                    this.name = name;
                    this._id = ++currentPlaylistId;
                }
            });

            Object.defineProperty(playlist, 'name', {
                get: function() {
                    return this._name;
                },
                set: function(val) {
                    validator.validateString(val, 'Playlist Name');
                    this._name = val;
                }
            });

            return playlist;
        }());

        playable = (function() {
            var currentPlayableId = 0,
                playable = Object.create({});

            Object.defineProperty(playable, 'init', {
                value: function(title, author) {
                    this.title = title;
                    this.author = author;
                    this._id = ++currentPlayableId;
                    return this;
                }
            });

            Object.defineProperty(playable, 'id', {
                get: function() {
                    return this._id;
                }
            });

            Object.defineProperty(playable, 'title', {
                get: function() {
                    this._title;
                },

                set: function(val) {
                    validator.validateString(val, 'Playable title');
                    this._title = val;
                }
            });

            Object.defineProperty(playable, 'author', {
                get: function() {
                    this._author;
                },

                set: function(val) {
                    validator.validateString(val, 'Playable author');
                    this._author = val;
                }
            });

            Object.defineProperty(playable, 'play', {
                value: function() {
                    return this.id + '. ' + this.title + ' - ' + this.author;
                }
            });

            return playable;
        }());

        audio = (function(parent) {
            var currentAudioId = 0,
                audio = Object.create(parent);

            Object.defineProperty(audio, 'init', {
                value: function(title, author, length) {
                    parent.init.call(this, title, author);
                    this.length = length;
                    this._id = ++currentAudioId;
                    return this;
                }
            });

            Object.defineProperty(audio, 'length', {
                get: function() {
                    this._length;
                },
                set: function(val) {
                    validator.validatePositiveNumber(val, 'Audio length');
                    this._length = val;
                }
            });

            Object.defineProperty(audio, 'play', {
                value: function() {
                    return parent.play.call(this) + ' - ' + this.length;
                }
            });

            return audio;
        }(playable));

        video = (function(parent) {
            var currentVideoId = 0,
                video = Object.create(parent);

            Object.defineProperty(video, 'init', {
                value: function(title, author, imdbRating) {
                    parent.init.call(this, title, author);
                    this.imdbRating = imdbRating;
                    this._id = ++currentVideoId;
                    return this;
                }
            });

            Object.defineProperty(video, 'imdbRating', {
                get: function() {
                    this._imdbRating;
                },
                set: function(val) {
                    validator.validateImdbRating(val, 'IMDB Rating');
                    this._imdbRating = val;
                }
            });

            Object.defineProperty(video, 'play', {
                value: function() {
                    return parent.play.call(this) + ' - ' + this.imdbRating;
                }
            });

            return video;
        }(playable));
        return {
            getPlayer: function(name) {
                // returns a new player instance with the provided name
                return Object.create(player).init(name);
            },
            getPlaylist: function(name) {
                //returns a new playlist instance with the provided name
                return Object.create(playlist).init(name);
            },
            getAudio: function(title, author, length) {
                //returns a new audio instance with the provided title, author and length
                return Object.create(audio).init(title, author, length);
            },
            getVideo: function(title, author, imdbRating) {
                //returns a new video instance with the provided title, author and imdbRating
                return Object.create(video).init(title, author, imdbRating);
            }
        };

    }());

    return module;
}

var module = solve();

var player = module.getPlayer('pesho');
var playlist = module.getPlaylist('gosho');
player.addPlaylist(playlist);
var audio = module.getAudio('ivan', 'ivanov', 4);
playlist.addPlayable(audio);

console.log(player.search('van'));
