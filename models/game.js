var mongoose = require('mongoose')

//genreSchema for app
var GameSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    rank: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    key: {
        type: Number,
        require: true
    },
    rate: {
        type: Number,
        require: true
    },
    pic: {
        type: String,
        require: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    last_date: {
        type: Date,
        default: Date.now
    }
})

var Game = module.exports = mongoose.model('Game', GameSchema)

//get Game
module.exports.getGame = function(callback, limit) {
    Game.find(callback).limit(limit)
}

//add Game
module.exports.addGame = function(game, callback) {
    Game.create(game, callback)
}

//delete Game
module.exports.deleteGame = function(id, callback) {
    Game.findOneAndRemove({name:id}, callback)
}

//update Game
module.exports.updateGame = function(id, game, callback) {
    Game.findOneAndUpdate({name:id}, game, callback)
}

//get:byId Game
module.exports.getGameById = function(id, callback) {
    Game.findById(id, callback)
}

//get GameByName
module.exports.getGameByName = function(name, callback, limit) {
    Game.findOne({name:name}, callback)
}

//find Game
module.exports.findGame = function(id, callback) {
    Game.findOne({name:id}, callback)
}