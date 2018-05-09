var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var port = 3000
var pug = require('pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'pug')

app.use(express.static('public'))

Game = require('./models/game')
Type = require('./models/type')
User = require('./models/user')

mongoose.connect('mongodb://localhost/SaleGameOnline')
var db = mongoose.connection

//router
app.get('/store', function(req, res) {
    Game.find({}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            Type.find({}, function(err, type){
                if (err) {
                    console.log(err)
                } else {
                    res.render('product', {
                        game: game,
                        type: type
                    })
                }
            })
        }
    })
})

app.get('/game/add_type', function(req, res) {
    res.render('add_type')
})

app.get('/game/add_game', function(req, res) {
    Type.find({},function(err, type){
        if (err){
            console.log(err)
        } else {
            res.render('add_game',{
                type : type
            })
        }
    })
})

app.get('/game/list', function(req, res) {
    Game.find({}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            Type.find({}, function(err, type){
                if (err) {
                    console.log(err)
                } else {
                    res.render('list', {
                        game: game,
                        type: type
                    })
                }
            })
        }
    })
})

app.get('/game/list/FPS', function(req, res) {
    Game.find({type:"FPS"}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            res.render('product', {
                game: game,
            })
        }
    })
})

app.get('/game/list/RPG', function(req, res) {
    Game.find({type:"RPG"}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            res.render('product', {
                game: game,
            })
        }
    })
})

app.get('/game/profile/:_id', function(req, res) {
    Game.find({name: req.params._id}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            Type.find({},function(err, type){
                if (err) {
                    console.log(err)
                } else {
                    res.render('profile', {
                        game: game,
                        type: type
                    })
                }
            })
            
        }
    })
})

app.get('/store/profile/:_id', function(req, res) {
    Game.find({name: req.params._id}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            Type.find({},function(err, type){
                if (err) {
                    console.log(err)
                } else {
                    res.render('profile_user', {
                        game: game,
                        type: type
                    })
                }
            })
            
        }
    })
})

app.get('/store/type/:_id', function(req, res) {
    Game.find({no_type:req.params._id}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            Type.find({}, function(err, type){
                if (err) {
                    console.log(err)
                } else {
                    res.render('product', {
                        game: game,
                        type: type
                    })
                }
            })
        }
    })
})

app.get('/game/edit/:_id', function(req, res) {
    Game.find({name: req.params._id}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            Type.find({}, function(err, type){
                if (err) {
                    console.log(err)
                } else {
                    res.render('edit', {
                        game: game,
                        type: type
                    })
                }
            })
            
        }
    })
})

app.post('/game/', function(req, res) {
    console.log(req)
    Game.find({
        name: req.params._id
    }, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            console.log(game)
        }
    })
})

//api
app.post('/api/type', function(req, res) {
    var type = req.body
    Type.addType(type, function(err, type) {
        if (err) {
            throw err
        }
        res.redirect('/game/list')
    })
})

app.post('/api/game', function(req, res) {
    var game = req.body
    console.log(game)
    Game.addGame(game, function(err, game) {
        if (err) {
            throw err
        }
        res.redirect('/game/list')
    })
})

app.delete('/api/game/:_id', function(req, res) {
    Game.deleteGame(req.params._id, function(err, game) {
        if (err) {
            throw err
        }
        res.json(game)
    })
})

app.post('/api/game/:_id', function(req, res) {
    var game = req.body
    game.last_date = Date.now()
    Game.updateGame(req.params._id, game, function(err, game) {
        if (err) {
            throw err
        }
        res.redirect('/game/list')
    })
})

app.get('/api/game/find/:_id', function(req, res) {
    Game.findGame(req.params._id,function(err, game) {
        if (err) {
            throw err
        }
        res.render('list', {
            game: game,
        })
    })
})

app.get('/api/buy/:_id', function(req, res) {
    var id = req.params._id
    Game.findOne({name:id},function(err, game){
        var temp = game.key -1
        Game.findOneAndUpdate({name:id}, {key:temp},function(err){
            if (err) {
                throw err
            } res.redirect('/store')
        })
    })
})

app.listen(port)
console.log('running on port', port)

app.get('/api/game', function(req, res) {
    Game.getGame(function(err, game) {
        if (err) {
            throw err
        }
        res.json(game)
    })
})

app.post('/api/game/getGameByName', function(req, res) {
    console.log(req)
    Game.getGameByName({
        name: req.body.name
    }, function(err, game) {
        if (err) {
            throw err
        }
        res.json(game)
    })
})