var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user : {type: mongoose.Schema.ObjectId, ref: "UndergraduateUserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'undergraduate_website'});
module.exports = websiteSchema;