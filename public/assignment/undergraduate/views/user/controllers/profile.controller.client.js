(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        userService
            .findUserById(userId)
            .then(renderUser);

        function renderUser (user) {
            model.user = user;
        }
    }
})();