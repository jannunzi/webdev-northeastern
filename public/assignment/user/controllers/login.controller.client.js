(function () {

    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($scope, $location, userService) {
        // JSON = JavaScript Object Notation

        $scope.login = function (user) {
            var user = userService.findUserByUsernameAndPassword(user.username, user.password);
            if(user === null) {
                $scope.errorMessage = "User not found";
            } else {
                $location.url("profile/"+user._id);
            }
        }
    }
})();