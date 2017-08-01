(function () {
    $(init);
    
    function init() {

        $("h1").draggable();

        var searchByTitleFld = $("#searchByTitleFld");
        var searchByTitleBtn = $("#searchByTitleBtn");

        $("h2").draggable();

        searchByTitleBtn.click(searchByTitle);
        
        function searchByTitle() {
            var movieTitle = searchByTitleFld.val();

            var url = "http://www.omdbapi.com/?s="+movieTitle+"&apikey=852159f0";
            $.ajax({
                url: url,
                success: renderMovies,
                error: function () {
                    alert("oops");
                }
            });
        }
        
        function renderMovies(response) {
            console.log(response);

            var table = $("<table>");
            table.addClass("table");

            for(var m in response.Search) {
                var movie = response.Search[m];
                var tr = $("<tr>");
                var td = $("<td>");
                td.append(movie.Title);
                tr.append(td);

                var img = $("<img>");
                img.attr("src", movie.Poster);
                img.attr("height", "100");

                td = $("<td>");
                td.append(img);
                tr.append(td);

                table.append(tr);
            }

            $("#searchResults").append(table);
            table.sortable();
        }
    }
})();