var mongoose = require('mongoose')

//typeSchema for app
var TypeSchema = mongoose.Schema({
    no: {
        type: Number,
        require: true,
        unique : true
    },
    name: {
        type: String,
        require: true,
        unique : true
    }
})

var Type = module.exports = mongoose.model('Type', TypeSchema)

//get Type
module.exports.getType = function(callback, limit) {
    Type.find(callback).limit(limit)
}

//add Type
module.exports.addType = function(data, callback) {
    Type.create(data, callback)
}

//delete Type
module.exports.deleteType = function(id, callback) {
    Type.findOneAndRemove({no:id}, callback)
}

//update Type
module.exports.updateType = function(id, data, callback) {
    Type.findOneAndUpdate({no:id}, data, callback)
}