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
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === "0") {
                        return userService.registerUser(user)
                    } else {
                        model.error = "User already exists";
                    }
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/profile/" + _user._id);
                });
        }
    }
})();