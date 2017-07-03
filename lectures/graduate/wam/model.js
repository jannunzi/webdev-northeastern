var mongojs = require('mongojs');
var q = require('q');
var db = mongojs('wam_summer1_2017_graduate');

module.exports = {
    findAll: findAll,
    create: create
};

function create(collectionName, doc) {
    var deferred = q.defer();
    var collection = db.collection(collectionName);
    collection.insert(doc, function (err, response) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(response);
        }
    });
    return deferred.promise;
}

function findAll(collectionName) {
    var deferred = q.defer();
    var collection = db.collection(collectionName);
    collection.find(function (err, docs) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}