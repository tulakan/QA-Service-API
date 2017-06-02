const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({ // new schema
    playlistID : String,
    playlistName : String,
    answer : Array,
    dateTime : String
});

module.exports = mongoose.model('Answer', AnswerSchema, 'Answer');
