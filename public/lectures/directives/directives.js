(function () {
    angular
        .module("myDirectives", [])
        .directive("itemList", itemListDirective)
        .directive("hello", helloDirective);
    
    function itemListDirective($http) {
        function linkFunction(scope, element) {
            console.log(element);
            var ul = element.find("ul");
            var startIndex = -1;
            var endIndex = -1;
            ul.sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);
                    $http.put("/api/widget/123?start="+startIndex+"&end="+endIndex);
                }
            });
        }
        return {
            templateUrl: "widget-list.html",
            link: linkFunction
        }
    }
    
    function helloDirective() {
        return {
            templateUrl: "helloWorld.html"
        };
    }
})();