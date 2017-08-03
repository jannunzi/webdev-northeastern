console.log("Hello from Mongoose!!!");

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/webdev_summer2_2017');
var userSchema = mongoose.Schema({
    username: String,
    first:    String,
    last:     String,
    status:   {type: String, enum: ["MARRIED", "SINGLE"]},
    dob:      Date,
    created:  {type: Date, default: Date.now}
}, {collection: "user"});

var userModel = mongoose.model("UserModel", userSchema);

removeUser("59825a2c6375bae379fdb05f")
    .then(function (status) {
        console.log(status);
    });

function removeUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUserValues) {
    return userModel.update({_id: userId}, {$set: {
        first: newUserValues.first,
        last: newUserValues.last,
        dob: new Date()
    }});
}

function findUserById(id) {
    return userModel.findById(id);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findAllUsers() {
    return userModel.find();
}

function createUser(user) {
    userModel.create(user, function (err, doc) {
        if(err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    });
}


// findUserById("598259a8e5aeede2cff1649c")
//     .then(function (user) {
//         console.log(user);
//     });

// findUserByUsername("alice")
//     .then(function (user) {
//         console.log(user);
//     });

// findAllUsers()
//     .then(function (users) {
//         console.log(users);
//     });

// createUser({username: "bob"});

// updateUser("598259a8e5aeede2cff1649c", {first: "Alice", last: "Wonderland"})
//     .then(function (status) {
//         console.log(status);
//     });
