module.exports = function (app) {

    app.get('/api/post', findAllPosts);
    app.get   ('/api/post/:index', findPostByIndex);
    app.delete('/api/post/:index', deletePostByIndex);
    app.put   ('/api/post/:index', updatePostByIndex);

    var posts = [
        {title: 'post 123', body: 'body 123'},
        {title: 'post 234', body: 'body 234'},
        {title: 'post 345', body: 'body 345'},
        {title: 'post 456', body: 'body 456'}
    ];
    
    function deletePostByIndex(req, res) {
        var index = req.params.index;
        posts.splice(index, 1);
        res.json(200);
    }
    
    function updatePostByIndex() {
        
    }

    function findPostByIndex(req, res) {
        var index = req.params['index'];
        res.json(posts[index]);
    }
    
    function findAllPosts(req, res) {
        res.json(posts);
    }
};
