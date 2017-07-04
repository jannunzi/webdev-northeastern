(function() {
    angular
        .module("TestApp", [])
        .controller("TestController", TestController)
        .filter('reverse', function() {
            return function(items) {
                if(items) {
                    return items.slice().reverse();
                } else {
                    return items;
                }
            };
        });

    function TestController($http) {
        var vm = this;
        vm.createMessage = createMessage;
        vm.deleteMessage = deleteMessage;

        function init() {
            findAllMessages();
        }
        init();

        function createMessage(message) {
            vm.message = "";
            var obj = {
                message: message
            };
            $http.post("/api/test", obj)
                .then(
                    findAllMessages,
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function deleteMessage(message) {
            $http.delete("/api/test/" + message._id)
                .then(
                    findAllMessages,
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function findAllMessages() {
            $http.get("/api/test")
                .then(
                    function(response) {
                        vm.messages = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();