(function () {
    $(function () {
        $("h1").remove();
        $("div").append("<h2>Hello World</h2>")
        var ul = $("<ul>");
        for(var l = 0; l < 10; l++) {
            // var li = $("<li> Item " + l + "</li>");
            var li = $("<li>");
            li.append("Item " + l);
            ul.append(li);
        }
        $("div").append(ul);
    })
})();