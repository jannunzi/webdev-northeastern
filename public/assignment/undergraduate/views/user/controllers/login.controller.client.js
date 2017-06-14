(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            // var found = userService.findUserByCredentials(username, password);
            userService
                // .findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);
            
            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }
            
            function login(found) {
                if(found !== null) {
                    $location.url('/profile');
                    // $scope.message = "Welcome " + username;
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();