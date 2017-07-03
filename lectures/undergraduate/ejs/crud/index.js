const app = require('../../../../express');

app.get('/lectures/undergraduate/ejs/crud/user', getUserList);
app.get('/lectures/undergraduate/ejs/crud/user/:userId/delete', deleteUser)
app.get('/lectures/undergraduate/ejs/crud/user/:userId/select', selectUser);
app.post('/lectures/undergraduate/ejs/crud/user', postUser);

var userModel = require('../../../../assignment/undergrad/models/user/user.model.server');

function selectUser(req, res) {
    var scope = {};
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            scope.selectedUser = user;
            return userModel
                .findAllUsers();
        })
        .then(function (users) {
            scope.users = users;
            res.render('lectures/undergraduate/ejs/crud/user', scope);
        });
}

function postUser(req, res) {
    if(req.body.action === 'create') {
        userModel
            .createUser(req.body)
            .then(function (user) {
                res.redirect('/lectures/undergraduate/ejs/crud/user');
            });
    } else if(req.body.action === 'update') {
        userModel
            .updateUser(req.body._id, req.body)
            .then(function (user) {
                res.redirect('/lectures/undergraduate/ejs/crud/user');
            });
    }
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.redirect('/lectures/undergraduate/ejs/crud/user');
        });
}

function getUserList(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            var scope = {
                users: users,
                selectedUser: {}
            };
            res.render('lectures/undergraduate/ejs/crud/user', scope);
        });
}