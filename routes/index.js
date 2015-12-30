'use strict';
let express = require('express');
let multer  = require('multer');
let fs = require('fs');
let path = require('path');

let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

let upload = multer({ dest: './uploads/'});
let router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.single('myUploadFile'), (req, res) => {
  let dirname = path.dirname(__dirname);
  let uploadedFilePath = req.file.path;
  let filename = req.file.filename;
  console.log(req.file.path);
  console.log(req.file.mimetype);
  console.log(req.conn);

  let readStream =  fs.createReadStream(`${dirname}/${uploadedFilePath}`);

  let gfs = Grid(conn.db);

  let writeStream = gfs.createWriteStream({
     filename: filename,
   });

  readStream.pipe(writeStream);

  res.render('success');

});

module.exports = router;
