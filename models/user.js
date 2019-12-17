var mongoose = require('mongoose');

var userSch = mongoose.Schema({
    usrname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var tableUsers = module.exports = mongoose.model('users', userSch);

module.exports.addUser = function(usr, callback){
	tableUsers.create(usr, callback);
}

module.exports.findUser = function(user, callback){
    console.log(user);
    tableUsers.find(user,callback);
}

module.exports.getAllUsernames = function(callback){
    tableUsers.find({},{usrname: 1, _id: 0},callback);
}
