var app = require('./express');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
require('./utilities/filelist');

app.use(app.express.static(__dirname + '/public'));

var blog = require('./lectures/graduate/blog/app');
blog(app);

// var todo = require('./lectures/undergraduate/todo/app');
// todo(app);

require('./assignment/undergrad/app');
// require('./assignment/graduates/app');

// require('./experiments/oxford/oxford.service.server');

app.listen(process.env.PORT || 3000);