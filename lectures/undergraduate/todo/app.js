module.exports = function (app) {

    var todos = [
        {title: 'todo 123', details: 'details 123'},
        {title: 'todo 234', details: 'details 234'},
        {title: 'todo 345', details: 'details 345'}
    ];

    app.get('/api/todo', findAllTodos);
    app.get('/api/todo/:index', findTodoByIndex);
    app.delete('/api/todo/:index', deleteTodo);

    function deleteTodo(req, res) {
        todos.splice(req.params.index, 1);
        res.json(todos);
    }

    function findAllTodos(req, res) {
        res.json(todos);
    }

    function findTodoByIndex(req, res) {
        var index = req.params['index'];
        res.json(todos[index]);
    }
};