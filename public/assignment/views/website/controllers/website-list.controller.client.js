(function () {
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);
    
    function websiteListController($routeParams, websiteService, user) {
        var model = this;

        model.userId = user._id;

        function init() {
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();
    }
})();