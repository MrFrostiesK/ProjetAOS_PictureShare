var mongoose = require('mongoose');

//GEN TEMPLATE

var memeSch = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    file:{
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
});

var temp = module.exports = mongoose.model('memes', memeSch);

var count;
temp.count(function(err, c){
	console.log("c je = "+c);
	count = c;
});
//get zie memes

module.exports.getMemes = function(callback, limit){
	getCount();
	temp.find(callback).sort({_id:-1}).limit(limit);
}

module.exports.getMemeByID = function(id, callback){
	getCount();
	temp.findById(id, callback);
}
//add ze meme
module.exports.addMeme = function(memedz, callback){
	getCount();
    temp.create(memedz, callback);
}

//update ze meme
module.exports.updateMeme = function(id, memedz, options, callback){
	getCount();
	var query = {_id:id};
    var update = {
        title: memedz.title,
        file: memedz.file,
        score: memedz.score,
        author: memedz.author
    }
    temp.findOneAndUpdate(query, update, options, callback);
}

//delete le meme
module.exports.delMeme = function(id, callback){
	getCount();
	var query = {_id:id};
    temp.remove(query, callback);
}

module.exports.getRandomMeme = function(callback, limit){
	getCount();
	//console.log(x);
	var rand = Math.floor(Math.random() * count);
	console.log("ovo je rand = " + rand);
	temp.find(callback).skip(rand).limit(1);
}

module.exports.getSkipedMemes = function(page, callback, limit){
	getCount();
	var pagger = 10 * (page - 1);
	temp.find(callback).sort({_id:-1}).skip(pagger).limit(10);
}

function getCount() {
	temp.count(function(err, c){
		console.log("c je = "+c);
		count = c;
	});
}
