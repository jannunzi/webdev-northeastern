(function () {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);
    
    function flickrController(flickrService) {
        var model = this;
        
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            console.log(photo);
        }
        
        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }
})();