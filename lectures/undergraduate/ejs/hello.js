const app = require('../../../express');

app.get('/this/could/be/anything', function (req, res) {
    var data = {
        message: 'hello from http handler'
    };
    res.render('lectures/undergrads/ejs/hello', data);
});