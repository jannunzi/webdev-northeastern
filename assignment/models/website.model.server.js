var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesForUser = findWebsitesForUser;

module.exports = websiteModel;

function findWebsitesForUser(developerId) {
    return websiteModel.find({developer: developerId});
}

function createWebsite(developerId, website) {
    website.developer = developerId;
    return websiteModel.create(website);
}