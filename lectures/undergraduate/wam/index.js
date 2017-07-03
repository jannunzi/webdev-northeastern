module.exports = function(application) {
    var app = require('../../../express');

    app.get('/wam/index.html', indexHtml);
    app.get('/wam/app.js', appJs);
    app.get('/wam/config.js', configJs);

    app.get('/wam/:entityName/templates/:type/:templateName', templatesHtml);
    app.get('/wam/:entityName/controllers/:type/:fileName', controllersJs);
    app.get('/wam/:entityName/service/:fileName', servicesJs);

    var model = require('./model');

    app.get('/wam/api/:entityName', findAll);
    app.get('/wam/api/:entityName/:id', findById);
    app.post('/wam/api/:entityName', create);

    function create(req, res) {
        var entityName = req.params.entityName;
        model.create(entityName, req.body)
            .then(function(response) {
                res.json(response);
            });
    }

    function findAll(req, res) {
        var entityName = req.params.entityName;
        model.findAll(entityName, {})
            .then(function(response) {
                res.json(response);
            });
    }

    function findById(req, res) {
        var entityName = req.params.entityName;
        model.findById(entityName, req.params.id)
            .then(function(response) {
                res.json(response);
            });
    }

    function servicesJs(req, res) {
        var entityName = req.params.entityName;
        application.entityName = entityName;
        res.render('lectures/undergraduate/wam/services', application);
    }
    
    function controllersJs(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        application.entityName = entityName;
        res.render('lectures/undergraduate/wam/controllers/'+type, application);
    }

    function templatesHtml(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        application.entityName = entityName;
        application.entity = application.entities[entityName];
        application.fields = application.entity.fields;
        res.render('lectures/undergraduate/wam/templates/'+type, application);
    }

    function configJs(req, res) {
        res.render('lectures/undergraduate/wam/configJs', application);
    }

    function appJs(req, res) {
        res.render('lectures/undergraduate/wam/appJs', application);
    }

    function indexHtml(req, res) {
        res.render('lectures/undergraduate/wam/index', application);
    }
};