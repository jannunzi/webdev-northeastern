const app = require('../../../../express');

var userModel = require('../../../../assignment/graduates/models/user/user.model.server');

app.get('/lectures/graduate/ejs/crud/user', findAllUsers);
app.get('/lectures/graduate/ejs/crud/user/:userId/delete', deleteUser);
app.get('/lectures/graduate/ejs/crud/user/:userId/select', selectUser);
app.post('/lectures/graduate/ejs/crud/user', postUser);

function postUser(req, res) {
    var user = req.body;
    if(req.body.action === 'create') {
        userModel
            .createUser(user)
            .then(function (user) {
                res.redirect('/lectures/graduate/ejs/crud/user');
            });
    } else if(req.body.action === 'update') {
        userModel
            .updateUser(req.body._id, user)
            .then(function (user) {
                res.redirect('/lectures/graduate/ejs/crud/user');
            });
    }
}

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
            scope.theusers = users;
            res.render('lectures/graduate/ejs/crud/user-list.view.server.ejs', scope);
        });
}

function deleteUser(req, res) {
    userModel
        .deleteUser(req.params.userId)
        .then(function (status) {
            //findAllUsers(req, res);
            res.redirect('/lectures/graduate/ejs/crud/user');
        });
}

function findAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            var scope = {
                theusers: users,
                selectedUser: {}
            };
            res.render('lectures/graduate/ejs/crud/user-list.view.server.ejs', scope);
        });
}


app.get('/hello/from/client', hello);

function hello(req, res) {
    res.render('lectures/graduate/ejs/crud/hello');
}