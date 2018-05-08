const mongoose = require('mongoose')

const UserSchma = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
        require: true
    },
    gender: {
        type: String,
        require: true
    }
})

var User = module.exports = mongoose.model('User', UserSchma)

//get User
module.exports.getUsers = function(callback, limit) {
    User.find(callback).limit(limit)
}

//add User
module.exports.addUsers = function(users, callback) {
    User.create(users, callback)
}

//update User
module.exports.updateUsers = function(id, users, callback) {
    User.findOneAndUpdate({
        username: id
    }, users, callback)
}

//delete User
module.exports.deleteUsers = function(id, callback) {
    User.findOneAndRemove({
        username: id
    }, callback)
}

//find user
module.exports.findUsers = function(id, callback) {
    User.findOne({
        username: id
    }, callback)
}