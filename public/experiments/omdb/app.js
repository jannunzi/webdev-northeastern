(function () {
    angular
        .module('OmdbApp', [])
        .controller('omdbController', omdbController);
    
    function omdbController($http) {
        var url = 'http://www.omdbapi.com/?apikey=852159f0&s=batman';

        $http.get(url)
            .then(function (response) {
                console.log(response);
            });
    }
})();