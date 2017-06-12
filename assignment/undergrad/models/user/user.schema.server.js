var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,

    _websites: [
        {type: mongoose.Schema.Types.ObjectId, ref:"UndergraduateWebsiteModel"}
    ],
    _following: [
        {type: mongoose.Schema.Types.ObjectId, ref:"UndergraduateUserModel"}
    ],

    dateCreated: {type: Date, default: Date.now},
    rating: {type: Number, default: 0}
}, {collection: "udergraduate_user"});
module.exports = userSchema;