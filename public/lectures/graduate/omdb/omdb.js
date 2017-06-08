(function () {
    angular
        .module('omdbApp', [])
        .controller('omdbController', omdbController);
    
    function omdbController($http) {
        var model = this;

        model.searchByTitle = searchByTitle;
        model.searchMovieByImdbID = searchMovieByImdbID;

        function searchMovieByImdbID(imdbID) {
            var url = "http://www.omdbapi.com/?apikey=852159f0&i=" + imdbID;
            $http.get(url)
                .then(renderMovieDetails);
        }

        function searchByTitle(title) {
            var url = "http://www.omdbapi.com/?apikey=852159f0&s=" + title;
            $http.get(url)
                .then(renderMovies);
        }

        function renderMovies(response) {
            model.movies = response.data.Search;
        }

        function renderMovieDetails(response) {
            model.movie = response.data;
        }
    }
})();