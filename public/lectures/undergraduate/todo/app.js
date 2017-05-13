(function () { //IIFE
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController);
    
    function TodoListController($scope, $http) {

        $scope.todo = {title: "initial title", details: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "};
        $scope.addTodo = addTodo;
        $scope.removeTodo = removeTodo;
        $scope.selectTodo = selectTodo;
        $scope.updateTodo = updateTodo;

        function init() {
            findAllTodos();
        }
        init();
        
        function findAllTodos() {
            $http.get('/api/todo')
                .then(function (response) {
                    $scope.todos = response.data;
                });
        }
        
        function updateTodo(todo) {
            $scope.todos[$scope.selectedIndex] = angular.copy(todo);
        }

        function selectTodo(index) {
            $scope.todo = angular.copy($scope.todos[index]);
            $scope.selectedIndex = index;
        }

        function removeTodo(todo) {//index) {
            // console.log(todo);
            var index = $scope.todos.indexOf(todo);
            // $scope.todos.splice(index, 1);
            $http.delete('/api/todo/'+index)
                .then(findAllTodos);
        }

        function addTodo(todo) {

            // var newTodo = {
            //     title: todo.title
            // };
            var newTodo = angular.copy(todo);
            newTodo._id = (new Date()).getTime();
            newTodo.date = new Date();

            // console.log(newTodo);

            $scope.todos.push(newTodo);
        }
    }
})();
