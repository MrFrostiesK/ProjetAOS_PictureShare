var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

Memes = require('./models/meme');
Users = require('./models/user');

//Connect to DB

mongoose.connect('mongodb://localhost/memes');

var db = mongoose.connection;
//-Hello-
app.get('/', function(req, res){
    res.send('Hello! use /api/memes');
});

//-MEMES-
app.get('/api/memes', function(req, res){
    Memes.getMemes(function(err, memes){
        if (err){
            throw err;
        }
        res.json(memes);
    });
});

app.get('/api/memes/:_id', function(req, res){
    Memes.getMemeByID(req.params._id, function(err, meme){
        if (err){
            throw err;
        }
        res.json(meme);
    });
});

app.post('/api/memes', function(req, res){
    var memez = req.body;
    Memes.addMeme(memez, function(err, memez){
        if (err){
            throw err;
        }
        res.json(memez);
    });
    console.log(memez);
});

app.put('/api/memes/:_id', function(req, res){
    var id = req.params._id;
    var memez = req.body;
    console.log(memez);
    Memes.updateMeme(id, memez, {}, function(err, memez){
        if (err){
            throw err;
        }
        res.json(memez);
    });
});

app.delete('/api/memes/:_id', function(req, res){
    var id = req.params._id;
    Memes.delMeme(id, function(err, meme){
        if (err){
            throw err;
        }
        res.json(meme);
    });
});

app.get('/api/meme/random', function(req, res){
	console.log("start");
	Memes.getRandomMeme(function(err, memes){
        if (err){
            throw err;
        }
        res.json(memes);
    });
	console.log("end");
});

app.get('/api/memez/skip/:_page', function(req, res){
	console.log("start");
	var page = req.params._page;
	Memes.getSkipedMemes(page, function(err, memes){
        if (err){
            throw err;
        }
        res.json(memes);
    });
	console.log("end");
});

//-Users-
app.post('/api/user/new', function(req, res){
    var user = req.body;
    Users.addUser(user, function(err, user){
        if (err){
            throw err;
        }
        res.json(user);
    });
    console.log(user);
});

app.get('/api/user/exist/:neki', function(req, res){
    var user = req.params.neki;
    var usrNpass = user.split("&");
    var jsonFormat = {
        usrname: usrNpass[0],
        password: usrNpass[1]
    };
    console.log(usrNpass[0]+" | "+usrNpass[1]);
    Users.findUser(jsonFormat, function(err, jsonFormat){
        if (err){
            throw err;
        }
        res.json(jsonFormat);
    });
    console.log("TEST "+jsonFormat);
});

app.get('/api/users', function(req, res){
	Users.getAllUsernames(function(err, users){
        if (err){
            throw err;
        }
        res.json(users);
    });
});


app.listen(3000);
console.log("port 3000");
