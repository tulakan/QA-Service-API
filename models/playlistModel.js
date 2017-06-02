const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({ // new schema
    playlistName : String,
    playlistLearningGroup : String,
    classLevel : String,
    totalTime : Number,
    totalQuiz : Number,
    quizList : Array,
    criterion : String
});

module.exports = mongoose.model('Playlist', PlaylistSchema, 'Playlist');
