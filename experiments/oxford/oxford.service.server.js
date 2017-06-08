// https://developer.oxforddictionaries.com/documentation

var q = require('q');
const app = require('../../express');
const https = require('https');

app.get('/api/oxford/query/language/:language/word/:word', searchQuery);

var appId   = process.env.OXFORD_APP_ID;
var appKey  = process.env.OXFORD_APP_KEY;
var baseUrl = process.env.OXFORD_API_BASE_URL;

function searchQuery(req, res) {
    var word     = req.params.word;
    var language = req.params.language;
    oxfordSearchQuery(language, word)
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function oxfordSearchQuery(language, word) {
    var deferred = q.defer();
    https.get({
        host: 'od-api.oxforddictionaries.com',
        path: '/api/v1/entries/'+language+'/'+word,
        headers: {
            "Accept": "application/json",
            "app_id": appId,
            "app_key": appKey
        }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}