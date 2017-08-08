(function () {
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);
    
    function websiteEditController($location, $routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.userId, model.websiteId)
                .then(function (response) {
                    model.website = response.data;
                });
        }
        init();

        function deleteWebsite(website) {
            websiteService
                .deleteWebsite(model.userId, website._id)
                .then(function (status) {
                    $location.url("/user/"+model.userId+"/website");
                });
        }
    }
})();