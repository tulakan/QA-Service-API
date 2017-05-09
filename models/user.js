const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    accountType: String,
    username: String,
    password: String,
    equipmentNo: String, //for student
    child: String // for parent
});

module.exports = mongoose.model('User', UserSchema, 'User');
