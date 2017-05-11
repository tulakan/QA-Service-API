const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    playlistName : String,
    playlistLearningGroup : String,
    classLevel : String,
    totalTime : Number,
    totalQuiz : Number,
    quizList : Array,
    criterion : String
});

module.exports = mongoose.model('Playlist', PlaylistSchema, 'Playlist');
