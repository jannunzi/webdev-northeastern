// TODO: npm install mongoose --save
// TODO: npm install q --save
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;

var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: {type: Date, default: Date.now},
    thumbsUp: {type: Number, default: 0}
}, {collection: 'blogpost'});

var blogModel = mongoose.model("BlogPost", blogPostSchema);

deleteBlogPost("5935e48b41634c877972a944")
    .then(function (status) {
        console.log(status);
        return findAllBlogPosts();
    })
    .then(function (posts) {
        console.log(posts);
    });


function deleteBlogPost(postId) {
    return blogModel.remove({_id: postId});
}
function updateBlogPost(postId, newPost) {
    return blogModel
        .update({_id: postId}, {
            $set: newPost
        });
}

function findBlogPostByTitle(title) {
    return blogModel.find({title: title});
}

function findBlogPostById(postId) {
    return blogModel.findById(postId);
}

function findAllBlogPosts() {
    return blogModel.find();
}

function createBlogPost(blogPost) {
    return blogModel
        .create(blogPost);
}

// createBlogPost({title: 'Post 789', body: 'Body 789'})
//     .then(function (doc) {
//         console.log(doc);
//     }, function (err) {
//         console.error(err);
//     });

// findAllBlogPosts()
//     .then(function (posts) {
//         console.log(posts);
//     });

// findBlogPostById("5935e2123395f084835d1ab3")
//     .then(function (blogPost) {
//         console.log(blogPost);
//     });

// findBlogPostByTitle('Post 456')
//     .then(function (doc) {
//         console.log(doc);
//     }, function (err) {
//         console.error(err);
//     });

// updateBlogPost("5935e48b41634c877972a944", {
//     body: 'Body 789 Body 789 Body 789 Body 789 Body 789 Body 789'
// })
//     .then(function (status) {
//         return findBlogPostById("5935e48b41634c877972a944")
//     }, function (err) {
//         console.error(err);
//     })
//     .then(function (post) {
//         console.log(post);
//     }, function (err) {
//         console.error(err);
//     });