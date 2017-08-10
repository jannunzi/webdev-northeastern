var app = require("../../express");
var userModel = require("../models/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

// http handlers

app.post("/api/login", passport.authenticate('local'), login);

app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.get('/api/checkLogin',checkLogin);

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        }, function (err) {
            if (err) {
                return done(err);
            }
        });
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function registerUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function findUser(req, res) {
    var body = req.body;
    var username = body.username;
    var password = body.password;


    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            })
        return;
    } else if(username) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
    }
    res.send("0");
}

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, response) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        });
    // for(var u in users) {
    //     if(users[u]._id === req.params.userId) {
    //         response.send(users[u]);
    //         return;
    //     }
    // }
    // response.sendStatus(404)
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}