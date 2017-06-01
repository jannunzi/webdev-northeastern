const app = require('../../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../../public/assignment/graduate/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var myFile        = req.file;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = {};
    widget.url = '/assignment/graduate/uploads/'+filename;

    var callbackUrl   = "/assignment/graduate/index.html#!/widget/345";

    res.redirect(callbackUrl);
}
