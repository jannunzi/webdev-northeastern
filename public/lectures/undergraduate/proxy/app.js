(function () {
    angular
        .module('proxyApp', [])
        .controller('proxyController', proxyController);

    function proxyController($http) {
        var model = this;
        $http.get('/api/oxford/query/language/en/word/hello')
            .then(renderWord);
        
        function renderWord(response) {
            model.word = response.data;
        }
    }
})();