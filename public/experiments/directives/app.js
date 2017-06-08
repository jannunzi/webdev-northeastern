(function () {
    angular
        .module('DirectiveLecture123', [])
        .directive('hello', helloTag)
        .directive('wdDraggable', wdDraggable)
        .directive('employees')
        .service("EmployeeService", EmployeeService);
    
    function EmployeeService() {
        this.getAllEmployees = getAllEmployees;
        function getAllEmployees() {
            return [
                {username: 'alice'},
                {username: 'bob'},
                {username: 'charlie'}
            ];
        }
    }

    function employees(EmployeeService) {
        function linkFunction(scope, element) {

        }
        return {
            link: linkFunction,
            templateUrl: 'employees.html'
        }
    }

    function wdDraggable() {

        function linkFunction(scope, element) {
            $(element).sortable();
        }

        return {
            link: linkFunction
        }
    }
    
    function helloTag() {
        
        function linkFunction(scope, element, attrs) {
            console.log(element);
            element.html('goodbye');
        }
        
        return {
            templateUrl: 'hello.html',
            link: linkFunction
        }
    }
})();