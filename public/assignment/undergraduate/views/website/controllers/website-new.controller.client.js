(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();

        // implementation
        function createWebsite(website) {
            // website.developerId = model.userId;
            websiteService
                .createWebsite(model.userId, website)
                .then(function (website) {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();