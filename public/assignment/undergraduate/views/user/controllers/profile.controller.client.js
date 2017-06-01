(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        userService
            .findUserById(userId)
            .then(renderUser);
        
        function renderUser (user) {
            model.user = user;
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }
    }
})();