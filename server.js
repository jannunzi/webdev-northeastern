var app = require('./express');

app.set('view engine', 'ejs');
require('./utilities/filelist');

app.use(app.express.static(__dirname + '/public'));

var blog = require('./lectures/graduate/blog/app');
blog(app);

var todo = require('./lectures/undergraduate/todo/app');
todo(app);

app.listen(process.env.PORT || 3000);