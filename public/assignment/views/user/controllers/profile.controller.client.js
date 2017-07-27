(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController)

    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            userService.findUserById(userId)
                .then(function (response) {
                    model.user = response.data;
            });
        }
        init();
        
        function updateUser(user) {
            userService.updateUser(user._id, user);
        }
        
        function unregister() {
            
        }
    }

})();