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
User = require('./models/user')

mongoose.connect('mongodb://localhost/SaleGameOnline')
var db = mongoose.connection

//router
app.get('/', function(req, res) {
    Game.find({}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            res.render('product', {
                game: game,
            })
        }
    })
})

app.get('/game/add', function(req, res) {
    res.render('add')
})

app.get('/game/list', function(req, res) {
    Game.find({}, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            res.render('list', {
                game: game,
            })
        }
    })
})

app.get('/game/profile/:_id', function(req, res) {
    Game.find({
        name: req.params._id
    }, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            res.render('profile', {
                game: game,
            })
        }
    })
})

app.get('/game/edit/:_id', function(req, res) {
    Game.find({
        name: req.params._id
    }, function(err, game) {
        if (err) {
            console.log(err)
        } else {
            res.render('edit', {
                game: game,
            })
        }
    })
})

app.get('/game/', function(req, res) {
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
app.post('/api/game', function(req, res) {
    var game = req.body
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
        }console.log(game)
        res.render('list', {
            game: game,
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