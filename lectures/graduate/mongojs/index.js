var mongojs = require('mongojs');
var db = mongojs('webdev_summer1_2017_graduate');
var q = require('q');

db.insert = insert;
db.update = update;
db.find = find;
db.remove = remove;

module.exports = db;

remove('mycollection', {username: 'alicia'})
    .then(function (status) {
        return find('mycollection');
    })
    .then(function (users) {
        console.log(users);
    });

function remove(collection, filter) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.remove(filter, function (err, status) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(status);
        }
    });
    return deferred.promise;
}

// update('mycollection', {username: 'alice'}, {username: 'alicia'})
//     .then(function (status) {
//         return find('mycollection');
//     })
//     .then(function (users) {
//         console.log(users);
//     });

function update(collection, filter, newDoc) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.update(filter, newDoc, function (err, status) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(status);
        }
    });
    return deferred.promise;
}

// find('mycollection')
//     .then(function (users) {
//         console.log(users);
//     });

function find(collection, filter) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.find(filter, function (err, docs) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(docs);
        }
    });
    return deferred.promise;
}

function insert(collection, doc) {
    var deferred = q.defer();
    var userCollection = db.collection(collection);
    userCollection.insert(doc, function (err, doc) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}

// insert('mycollection', {
//     username: 'dan',
//     first: 'Daniel',
//     last: 'Gonzalez'})
//     .then(function (newUser) {
//         console.log(newUser);
//     });
