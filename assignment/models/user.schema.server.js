var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    roles: [{type: String, enum:["ADMIN", "STUDENT", "FACULTY"]}],
    currentRole: String,
    firstName: String,
    lastName: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}],
    isAdmin: Boolean
}, {collection: "user"});
module.exports = userSchema;