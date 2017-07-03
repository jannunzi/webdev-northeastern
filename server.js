var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(session({ secret: "put some text here" }));
app.use(passport.initialize());
app.use(passport.session());

// require('./lectures/graduate/session/app');

app.get('/api/undergraduate/session', function (req, res) {
    console.log(req.session);
    res.send(req.session);
});
app.get('/api/undergraduate/session/:name/:value', function (req, res) {
    var name = req.params.name;
    var value = req.params.value;

    var obj = {
        name: value
    };

    req.session[name] = obj;

    console.log(req.session);
    res.send(req.session);
});

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
// require('./lectures/undergraduate/ejs/hello');
// require('./experiments/ejs/crud');
// require('./lectures/undergraduate/ejs/crud');
// require('./lectures/graduate/ejs/crud');
// require('./lectures/graduate/mongojs');

// var movieApp = require('./movies.json');
// require('./lectures/undergraduate/wam')(movieApp);

var application = {
    "name": "charterApp",
    "entities": {
        "boat": {
            "fields": {
                "brand": {},
                "length": {},
                "type": {}
            }
        },
        "crew": {},
        "booking": {},
        "user": {}
    }
};
require('./lectures/graduate/wam')(application);

app.listen(process.env.PORT || 3000);