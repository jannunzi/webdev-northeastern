(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .createUser(newUser);
                    }
                )
                .then(function (user) {
                    $location.url('/user/' + user._id);
                });

            // if(found !== null) {
            //     model.error = "sorry, that username is taken";
            // } else {
            //     var newUser = {
            //         username: username,
            //         password: password
            //     };
            //     newUser = userService.createUser(newUser);
            //     $location.url('/user/' + newUser._id);
            // }
        }
    }
})();