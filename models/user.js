const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('User', UserSchema, 'User');/**
 * Created by Kanrawee Karaboot on 4/2/2017.
 */
