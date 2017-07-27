(function () {
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);
    
    function websiteNewController($location, $routeParams, websiteService) {
        var model = this;

        model.createWebsite = createWebsite;

        model.userId = $routeParams.userId;

        function init() {
            websiteService.findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(website) {
            websiteService
                .createWebsite(model.userId, website)
                .then(function () {
                    $location.url("/user/"+model.userId+"/website");
                });
        }
    }
})();