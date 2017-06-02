// widget.service.server.js
var app = require('../../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../../public/assignment/undergraduate/uploads' });

app.post ("/api/assignment/undergrad/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    console.log(myFile);

    // widget = getWidgetById(widgetId);
    var widget = {};
    widget.url = '/assignment/undergraduate/uploads/'+filename;

    var callbackUrl   = "/assignment/undergraduate/index.html#!/widget/"+widgetId;

    res.redirect(callbackUrl);
}
