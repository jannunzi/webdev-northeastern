(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location,
                               $routeParams,
                               userService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        // model.user = userService.findUserById(model.userId);
        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }
        
        function renderUser (user) {
            model.user = user;
        }
        
        function userError(error) {
            model.error = "User not found";
        }
    }
})();