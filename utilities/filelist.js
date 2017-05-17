const app = require('../express');
const fs = require('fs');
app.use(function (req, res, next) {
    if(req.url.slice(-1) === '/') {
        const folder = __dirname+'/../public'+req.url;
        const secondToLastSlash = req.url.slice(0, -1).indexOf('/');
        const parent = folder.substring(0, secondToLastSlash);
        fs.readdir(folder, function (err, files) {
            // if(files.indexOf('index.html') > -1) {
            //     next();
            // } else {
                res.render('index', {files: files, folder: req.url, parent: parent});
            // }
        });
    } else {
        next();
    }
});