(function () {

    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($scope, $location, userService) {

        $scope.login = login;

        function init() {
            
        }
        init();
        
        function login(user) {
            var user = userService.findUserByUsernameAndPassword(user.username, user.password);
            if(user === null) {
                $scope.errorMessage = "User not found";
            } else {
                $location.url("profile/"+user._id);
            }
        }
    }
})();