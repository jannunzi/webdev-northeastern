(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);
    
    function websiteService($http) {
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsiteForUser = createWebsiteForUser;

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        function createWebsiteForUser(userId, website) {
            return $http.post("/api/assignment/graduate/user/"+userId+"/website", website)
                .then(function (response) {
                    return response.data;
                });
            // website._id = (new Date()).getTime() + "";
            // websites.push(website);
        }

        function deleteWebsite(userId, websiteId) {
            return $http
                .delete("/api/assignment/graduate/user/"+userId+"/website/" + websiteId)
                .then(function (response) {
                    return response.data;
                });
            // var website = findWebsiteById(websiteId);
            // var index = websites.indexOf(website);
            // websites.splice(index, 1);
        }
        
        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function findAllWebsitesForUser(userId) {

            var url = "/api/assignment/graduate/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();