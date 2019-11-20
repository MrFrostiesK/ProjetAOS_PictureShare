class meme {
    constructor(id, title, file, score, author) {
        this.title = title;
        this.file = file;
        this.score = score;
        this.author = author;
		this.id = id;
    }
    createMEME(){
        return $('<div>').attr("id", this.id).append($('<h3>').text(this.title)).append($('<img>').attr('src', this.file).addClass('img-responsive').addClass('width100')).append($('<div>').text("author: " + this.author)).append($("<hr>")).click(function(){
            var id = $(this).attr("id");
            var current = searchMeme(id);
            $('#titl').text(current.title);
            $('#pict').attr("src", current.file);
            $('#authores').text("Author: " + current.author);
            $("#picture").modal();
        });
    }
	retID(){
		return this.id;
	}

}
var trueusername = "";
var skip = 1;
var memes = [];
$(function() {
    $('#logout').hide();
    $('#file-up').hide();
    $('#logga').hide();
	$('#uploadMeme').hide();
    if (localStorage.user) {
        $('#singu').hide();
        $('#loggu').hide();
        trueusername = localStorage.user;
        $('#loggz').text(" "+localStorage.user);
        $('#logga').show();
        $('#logout').show();
		$('#uploadMeme').show();
        $('#hiddn').val(trueusername);
    }
    $.ajax({
        method: "GET",
        url: "http://the-dodo.xyz:3000/api/memez/skip/1",
        dataType: "json",
        success: function(result){
            for (var i = 0; i < result.length; i++) {
                var lel = new meme(result[i]._id, result[i].title, result[i].file, result[i].score, result[i].author);
                $('#posts').append(lel.createMEME());
                memes.push(lel);
            }
        }
    });
    $('#test').click(function(){
        console.log("werks");
    });
    console.log("dela?");
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            getMore();
        }
    });
    $("#regForm").submit(function(e){
        e.preventDefault();
        //console.log("hehehehe");
        if ($('#pass1').val() === $('#pass2').val()) {
            console.log("is tru");
            $.ajax({
                method: "GET",
                url: "http://the-dodo.xyz:3000/api/users",
                dataType: "json",
                success: function(result){
                    var isok = true;
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].usrname.toLowerCase() === $('#usr').val().toLowerCase()) {
                            console.log("is tru as well");
                            alert("User allready exists!");
                            isok = false;
                        }

                    }
                    if(isok) {
                        var newUser = {
                            email: $("#email").val(),
                            usrname: $("#usr").val(),
                            password: $("#pass1").val()
                        };
                        console.log(newUser);
                        $.ajax({
                            type: "POST",
                            url: "http://the-dodo.xyz:3000/api/user/new",
                            data: JSON.stringify(newUser),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(data){
                                console.log(data);
                                trueusername = $("#usr").val();
                                console.log("u are loged in");
                                $('#singu').hide();
                                $('#loggu').hide();
                                $('#loggz').text(" "+trueusername);
                                $('#logga').show();
                                $('#logout').show();
            					$('#uploadMeme').show();
                                loginAdd(usrnm);
                                $('#register').modal("hide");
                                $('#hiddn').val(trueusername);
                            },
                            failure: function(errMsg) {
                                alert(errMsg);
                            }
                        });
                    }
                }
            });
        }
    });
});

function getMore() {
    skip++;
    $.ajax({
        method: "GET",
        url: "http://the-dodo.xyz:3000/api/memez/skip/"+skip,
        dataType: "json",
        success: function(result){
            if(result.length === 0){
                alert("NO MORE MEMES");
                skip--;
            }
            for (var i = 0; i < result.length; i++) {
                var lel = new meme(result[i]._id, result[i].title, result[i].file, result[i].score, result[i].author);
                $('#posts').append(lel.createMEME());
                memes.push(lel);
            }
        }
    });
}

function upload() {
    if($("#title").val()!=="" && $("#url").val() !== ""){
        console.log("dodomemes");
        var jsonFormat = {
            title: $("#title").val(),
            file: $("#url").val(),
            score: "0",
            author: trueusername
        };
        console.log(jsonFormat);
        $.ajax({
            type: "POST",
            url: "http://the-dodo.xyz:3000/api/memes",
            data: JSON.stringify(jsonFormat),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){console.log(data);},
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
        var lel2 = new meme(9999999,jsonFormat.title, jsonFormat.file,jsonFormat.score, jsonFormat.author);
        console.log(lel2);
        memes.push(lel2);
        $('#posts').prepend(lel2.createMEME());
        $('#9999999').addClass("alert alert-success");
    }
    else {
        alert("empty field!!!!");
    }
}


function uploadDodo() {
    for (var i = 605; i < 820; i++) {
        console.log("dodomemes");
        var jsonFormat = {
            title: "Meme #" + i + " from Dodo's collection",
            file: "http://the-dodo.xyz/memes/"+i+".jpg",
            score: "0",
            author: "Dodo"
        };
        console.log(jsonFormat);
        $.ajax({
            type: "POST",
            url: "http://the-dodo.xyz:3000/api/memes",
            data: JSON.stringify(jsonFormat),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){console.log(data);},
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    }
}

function change(butt) {
    if(butt==="file"){
        $("#url-up").fadeOut(500,function(){
            $("#file-up").fadeIn(500);
        });
    }
    if(butt==="url") {
        $("#file-up").fadeOut(500,function(){
            $("#url-up").fadeIn(500);
        });
    }
}

function searchMeme(id) {
    for (var i = 0; i < memes.length; i++) {
        if(memes[i].id === id){
            return memes[i];
        }
    }
}

function addComment() {
    if($('#comment').val()!==""){
        $('#comments').append($('<div>').append($('<h6>').append($('<b>').text("You"))).append($('<hr>')).append($('<div>').text($('#comment').val())).addClass('well well-sm').addClass("alert alert-success", 500, function() {
            $(this).removeClass("alert alert-success", 1000);
        }));
        $('#comment').val("");
    }
}

function logIn(){
    var usrnm = $('#usrLog').val();
    var passwrd = $('#passLog').val();
    var ok = false;
    console.log(usrnm+"&"+passwrd);
    $.ajax({
        method: "GET",
        url: "http://the-dodo.xyz:3000/api/user/exist/"+usrnm+"&"+passwrd,
        dataType: "json",
        success: function(result){
            if(result.length>0){
                var thus = result[0].usrname+"&"+result[0].password;
                var that = usrnm+"&"+passwrd;
                if(thus === that){
                    console.log("u are loged in");
                    trueusername =  usrnm;
                    $('#singu').hide();
                    $('#loggu').hide();
                    $('#loggz').text(" "+trueusername);
                    $('#logga').show();
                    $('#logout').show();
					$('#uploadMeme').show();
                    $('#hiddn').val(trueusername);
                    loginAdd(usrnm);
                }
            }
        }
    });
}

function logOut(){
    $('#singu').show();
    $('#loggu').show();
    $('#logga').hide();
    $('#logout').hide();
	$('#uploadMeme').hide();
    loginRem();
}

function loginAdd(user){
    localStorage.setItem("user", user);
}
function loginRem(){
    localStorage.removeItem("user");
}
