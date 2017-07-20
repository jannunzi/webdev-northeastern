(function () {

    angular
        .module("WamApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/profile/:userId", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
    }
})();