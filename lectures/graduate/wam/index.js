module.exports = function (application) {
    var app = require("../../../express");

    app.get('/wam/index.html', indexHtml);
    app.get('/wam/app.js', appJs);
    app.get('/wam/config.js', configJs);
    app.get('/wam/:entityName/templates/:type/:templateHtmlFileName', templateHtml);
    app.get('/wam/:entityName/controllers/:type/:controllerFileName', controllerJs);
    app.get('/wam/:entityName/service/*', serviceJs);

    app.get('/wam/api/:entityName', findAll);
    app.post('/wam/api/:entityName', create);

    var model = require('./model');

    function create(req, res) {
        var entityName = req.params.entityName;
        model
            .create(entityName, req.body)
            .then(function (data) {
                res.json(data);
            });
    }

    function findAll(req, res) {
        var entityName = req.params.entityName;
        model
            .findAll(entityName)
            .then(function (data) {
                res.json(data);
            });
    }

    function serviceJs(req, res) {
        var entityName = req.params.entityName;
        application.entityName = entityName;
        res.render("lectures/graduate/wam/services/service.ejs",
            application);
    }

    function controllerJs(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        application.entityName = entityName;
        res.render("lectures/graduate/wam/controllers/"+type,
            application);
    }

    function templateHtml(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        application.entityName = entityName;
        res.render("lectures/graduate/wam/templates/"+type,
            application);
    }

    function configJs(req, res) {
        res.render("lectures/graduate/wam/config.ejs",
            application);
    }

    function appJs(req, res) {
        res.render("lectures/graduate/wam/app.ejs",
            application);
    }

    function indexHtml(req, res) {
        res.render("lectures/graduate/wam/index.ejs",
            application);
    }
};
