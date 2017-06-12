var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('UndergraduateWebsiteModel', websiteSchema);
var userModel = require('../../models/user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsiteFormUser = deleteWebsiteFormUser;

module.exports = websiteModel;

function deleteWebsiteFormUser(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .removeWebsite(userId, websiteId);
        });
}

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}