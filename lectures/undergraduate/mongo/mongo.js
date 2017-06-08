// TODO: npm install mongoose --save


var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev_summer1_2017');

todoSchema = mongoose.Schema({
    title: String,
    dueDate: Date
}, {collection: 'todo'});

todoModel = mongoose.model('TodoModel', todoSchema);

todoModel.findAllTodos = findAllTodos;
todoModel.createTodo = createTodo;

modules.export = todoModel;


// createTodo({title: 'Share Lecture Code', date: new Date()})
//     .then(function (todo) {
//         console.log(todo);
//         return findAllTodos();
//     })
//     .then(function (todos) {
//         console.log(todos);
//     });



function findAllTodos() {
    return todoModel.find()
}

function createTodo(todo) {
    return todoModel.create(todo);
}

