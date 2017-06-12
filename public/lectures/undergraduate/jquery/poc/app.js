(function () {
    jQuery(init);
    
    function init() {
        var searchBtn = jQuery('#searchBtn');
        var titleFld  = jQuery('#title');
        var resultsUl = $('#results');
        var titleDetails = $('#titleDetails');
        var directorDetails = $('#directorDetails');
        var plotDetails = $('#plotDetails');
        var actorsDetails = $('#actorsDetails');
        var posterDetails = $('#posterDetails');

        titleFld.val('star wars');

        searchBtn.click(searchMovie);

        function searchMovie() {
            var titleText = titleFld.val();
            var url = "http://www.omdbapi.com/?apikey=852159f0&s=" + titleText;
            jQuery.ajax({
                url: url,
                success: renderMovies,
                error:   renderError
            });
        }

        function renderMovies(response) {
            // console.log(response);
            var movies = response.Search;

            resultsUl.empty();

            for(var m in movies) {
                var movie = movies[m];
                var title = movie.Title;
                var imdbID = movie.imdbID;
                var poster = movie.Poster;

                var liMovie   = $('<li>');
                liMovie.attr('id', imdbID);
                liMovie.addClass('list-group-item');

                var posterImg = $('<img>');
                posterImg.attr('width', '50px');
                posterImg.attr('src', poster);

                liMovie.append(posterImg);
                liMovie.append(title);
                liMovie.click(fetchDetails);
                resultsUl.append(liMovie);
            }
        }

        function fetchDetails(event) {
            var currentTarget = $(event.currentTarget);
            var imdbID = currentTarget.attr('id');
            var url = "http://www.omdbapi.com/?apikey=852159f0&i=" + imdbID;
            jQuery.ajax({
                url: url,
                success: renderDetails,
                error:   renderError
            });
        }

        function renderDetails(movie) {
            console.log(movie);
            titleDetails.html(movie.Title);
            directorDetails.html(movie.Director);
            plotDetails.html(movie.Plot);
            posterDetails.attr('src', movie.Poster);
            var actors = movie.Actors.split(',');
            actorsDetails.empty();
            for(var a in actors) {
                var liActor = $('<li>');
                liActor.addClass('list-group-item');
                liActor.html(actors[a]);
                actorsDetails.append(liActor);
            }
        }

        function renderError(error) {
            console.error(error);
        }
    }
})();