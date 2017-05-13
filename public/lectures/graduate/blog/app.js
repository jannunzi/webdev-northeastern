(function(){ // IIFE = Inmediately Invoked Function Expression
    angular
        .module("BlogApp", [])
        .controller("BlogPostListController", BlogPostListController);
    
    function BlogPostListController($scope, $http) {
        $scope.hello = 'hello world !!!!';
        $scope.post = {title: 'this is the default title', body: 'this is the body from the controller'}
        $scope.posts = [];

        function init() {
            findBlogPosts();
        }
        init();

        function findBlogPosts() {
            $http.get('/api/post')
                .then(function(response){
                    $scope.posts = response.data;
                });
        }

        // event handlers
        $scope.deletePost = deletePost;
        $scope.addPost = addPost;
        $scope.selectPost = selectPost;
        $scope.updatePost = updatePost;

        function updatePost(post) {
            $scope.posts[$scope.index] = angular.copy(post);
        }

        function selectPost(index) {
            $scope.post = angular.copy($scope.posts[index]);
            $scope.index = index;
        }

        function addPost(post) {
            var newPost = {
                title: post.title,
                body: post.body,
                date: new Date()
            };
            $scope.posts.push(newPost);
            console.log($scope.posts);
        }
        
        function deletePost(index) {
            // $scope.posts.splice(index, 1);
            $http
                .delete('/api/post/' + index)
                .then(findBlogPosts);
        }
    }
})();
