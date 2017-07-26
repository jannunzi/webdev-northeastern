(function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;
        
        model.registerUser = registerUser;

        function init() {

        }
        init();
        
        function registerUser(user) {
            var promise = userService.findUserByUsername(user.username);
            promise
                .then(function (response) {
                    var _user = response.data;
                    if(_user === "0") {
                        var user = userService.registerUser(user);
                        $location.url("/profile/"+user._id);
                    } else {
                        model.error = "User already exists";
                    }
                });
        }
    }
})();