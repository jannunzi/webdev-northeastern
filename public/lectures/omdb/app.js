(function () {
    angular
        .module("omdbApp", ["ngRoute"])
        .config(configuration)
        .controller("searchController", searchController)
        .controller("detailsController", detailsController)
        .service("movieService", movieService);
    
    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID", {
                templateUrl: "details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }
    
    function detailsController($routeParams, movieService) {
        var model = this;

        var imdbID = $routeParams.imdbID;
        
        function init() {
            movieService
                .searchMovieByImdbId(imdbID)
                .then(renderMovie);
        }
        init();

        function renderMovie(movie) {
            model.movie = movie;
        }
    }
    
    function searchController(movieService) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        function init() {

        }
        init();
        
        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }
    }
    
    function movieService($http) {
        this.searchMovieByTitle = searchMovieByTitle;
        this.searchMovieByImdbId = searchMovieByImdbId;
        
        function searchMovieByImdbId(imdbID) {
            var url = "http://www.omdbapi.com/?i="+imdbID+"&apikey=852159f0";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function searchMovieByTitle(movieTitle) {
            var url = "http://www.omdbapi.com/?s="+movieTitle+"&apikey=852159f0";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();