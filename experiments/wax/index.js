module.exports = function (config) {
    app = config.app;
    app.get('/wax/test', test);
};

var app = null;

function test(req, res) {
    res.send('test');
}
