(function () {
    angular
        .module("directivesApp", ["myDirectives"])
        .controller("directiveController", directiveController)
    
    function directiveController($scope) {
        $scope.message = "Hello From Controller";
        $scope.widgets = [
            {"type": "HEADINGS"},
            {"type": "IMAGES"},
            {"type": "YOUTUBE"},
            {"type": "HTML"}
        ];
    }
})();