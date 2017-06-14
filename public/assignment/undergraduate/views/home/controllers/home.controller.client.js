(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);
    
    function homeController(currentUser) {
        var model = this;
        model.currentUser = currentUser;
    }
})();