(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController)

    function profileController($scope, $routeParams, userService) {
        var userId = $routeParams["userId"];

        $scope.user = userService.findUserById(userId);
    }

})();