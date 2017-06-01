(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = null;//userService.findUserByUsername(username);

            if(found !== null) {
                model.error = "Username is not available";
            } else {
                var user = {
                    username: username,
                    password: password
                };
                // model.message = user;
                userService
                    .createUser(user)
                    .then(function (user) {
                        $location.url('/user/' + user._id);
                    });
            }
        }
    }
})();