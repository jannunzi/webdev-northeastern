var app = require('../express');

app.get("/api/test", findAllMessages);
app.post("/api/test", createMessage);
app.delete("/api/test/:id", deleteMessage);

var connectionString = 'mongodb://127.0.0.1:27017/test';

if(process.env.MLAB_USERNAME) {
    connectionString = encodeURIComponent(process.env.MLAB_USERNAME) + ":" +
        encodeURIComponent(process.env.MLAB_PASSWORD) + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var mongoose = require("mongoose");
// https://stackoverflow.com/a/23344660
mongoose.connect(connectionString, {
    uri_decode_auth: true
    }, function(err, db) {

    }
);

var TestSchema = mongoose.Schema({
    message: String
});

var TestModel = mongoose.model("TestModel", TestSchema);

function findAllMessages(req, res) {
    TestModel
        .find()
        .then(
            function(tests) {
                res.json(tests);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

function createMessage(req, res) {
    TestModel
        .create(req.body)
        .then(
            function(test) {
                res.json(test);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}

function deleteMessage(req, res) {
    TestModel
        .remove({_id: req.params.id})
        .then(
            function(result) {
                res.json(result);
            },
            function(err) {
                res.status(400).send(err);
            }
        );
}
