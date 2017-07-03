var mongojs = require('mongojs');
var q = require('q');

var db = mongojs("wam_summer1_2017");

module.exports = {
    findAll: findAll,
    findById: findById,
    create: create
};

function create(collectionName, data) {
    var deferred = q.defer();

    var collection = db.collection(collectionName);
    collection.insert(data, function(err, response){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(response);
        }
    });

    return deferred.promise;
}

function findAll(collectionName, filter) {
    var deferred = q.defer();

    var collection = db.collection(collectionName);
    collection.find(filter, function(err, response){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(response);
        }
    });

    return deferred.promise;
}


function findById(collectionName, id) {
    var deferred = q.defer();

    var collection = db.collection(collectionName);
    collection.findOne({_id: mongojs.ObjectId(id)}, function(err, response){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(response);
        }
    });

    return deferred.promise;
}