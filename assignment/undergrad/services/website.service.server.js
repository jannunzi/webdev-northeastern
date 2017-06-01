var app = require('../../../express');

app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function findAllWebsitesForUser(req, res) {
    var resultSet = [];
    for(var w in websites) {
        if(websites[w].developerId === req.params.userId) {
            // websites[w].created = new Date();
            // websites[w].updated = new Date();
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}