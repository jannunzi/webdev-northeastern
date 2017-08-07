var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

websiteModel.createWebsite = createWebsite;

module.exports = websiteModel;

function createWebsite(developerId, website) {
    website.developer = developerId;
    return websiteModel.create(website);
}