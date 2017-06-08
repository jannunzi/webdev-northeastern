const app = require('../../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/assignment/graduate/user/:userId/website", findAllWebsitesForUser);
app.post("/api/assignment/graduate/user/:userId/website", createWebsiteForUser);
app.delete("/api/assignment/graduate/user/:userId/website/:websiteId", deleteWebsiteFromUser);

var websiteModel = require('../models/website/website.model.server');

function deleteWebsiteFromUser(req, res) {
    var websiteId = req.params.websiteId;
    var userId = req.params.userId;
    websiteModel
        .deleteWebsiteFromUser(userId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}

function createWebsiteForUser(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}


function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        })
    // var results = [];
    //
    // for(var v in websites) {
    //     if(websites[v].developerId === req.params.userId) {
    //         results.push(websites[v]);
    //     }
    // }
    //
    // res.json(results);
}
