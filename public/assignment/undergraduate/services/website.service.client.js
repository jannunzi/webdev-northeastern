(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);
    
    function websiteService($http) {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        return {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        
        function createWebsite(userId, website) {
            return $http.post('/api/assignment/user/'+userId+'/website', website)
                .then(function (response) {
                    return response.data;
                });
            // website._id = (new Date()).getTime() + "";
            // website.created = new Date();
            // website.updated = new Date();
            // websites.push(website);
        }
        
        function updateWebsite(websiteId, website) {
            
        }
        
        function deleteWebsite(userId, websiteId) {
            var url = "/api/assignment/user/"+userId+"/website/"+websiteId;
            return $http.delete(url);
            // var website = websites.find(function (website) {
            //     return website._id === websiteId;
            // });
            // var index = websites.indexOf(website);
            // websites.splice(index, 1);
        }

        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var resultSet = [];
            // for(var w in websites) {
            //     if(websites[w].developerId === userId) {
            //         // websites[w].created = new Date();
            //         // websites[w].updated = new Date();
            //         resultSet.push(websites[w]);
            //     }
            // }
            // return resultSet;
        }
    }
})();