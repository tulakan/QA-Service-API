const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({ // new schema
    question: String,
    choice :{
        choice1 : String,
        choice2 : String,
        choice3 : String,
        choice4 : String,

    },
    correctChoice : String,
    learningGroup : String,
    classLevel : String,
    quizType : String,
    difficulty : String,
    time : String,
    timeUnit : String,
    tag : Array,
});

module.exports = mongoose.model('quiz', quizSchema, 'quiz');
