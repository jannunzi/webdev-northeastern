(function () {
    jQuery(init);
    
    function init() {
        var searchBtn = jQuery('#searchBtn');
        var titleFld = jQuery('#title');

        searchBtn.click(searchMovie);
        
        function searchMovie() {
            var titleText = titleFld.val();
            var url = "http://www.omdbapi.com/?apikey=852159f0&s=" + titleText;
            console.log(url);
            jQuery.ajax({
                url: url,
                success: renderMovies,
                error: renderError
            });
        }

        function renderMovies(response) {
            // console.log(response);
            var movies = response.Search;

            var resultsUl = $('#results');
            resultsUl.empty();

            for(var m in movies) {
                var movie = movies[m];
                var title = movie.Title;
                var imdbID = movie.imdbID;
                var poster = movie.Poster;

                console.log([title, imdbID, poster]);

                var liMovie = $('<li class="list-group-item">');
                var posterImg = $('<img src="' + poster + '" width="50px"/>');
                liMovie.append(posterImg);
                liMovie.append(title);
                liMovie.click(renderDetails);
                resultsUl.append(liMovie);
            }
            
            function renderDetails() {
                console.log('render details');
            }
        }

        function renderError(error) {
            console.error(error);
        }
    }
})();