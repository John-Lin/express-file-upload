'use strict';
let express = require('express');
let multer  = require('multer');
let fs = require('fs');
let path = require('path');

let mongoose = require('mongoose');
let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

let upload = multer({ dest: './uploads/'});
let router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.single('myUploadFile'), (req, res) => {
  let dirname = path.dirname(__dirname);
  if (!req.file) {
    // user did not choose a file
    return res.status(403).send('Forbidden. Please choose a file!');
  }

  let uploadedFilePath = req.file.path;
  let filename = req.file.filename;
  let conn = req.conn;

  let readStream =  fs.createReadStream(`${dirname}/${uploadedFilePath}`);

  let gfs = Grid(conn.db);

  let writeStream = gfs.createWriteStream({
     filename: filename,
   });

  readStream.pipe(writeStream);
  res.render('success', {filename: filename});
});

router.get('/uploaded/:id', (req, res) => {
  let fileId = req.params.id;
  let conn = req.conn;
  let gfs = Grid(conn.db);

  // console.log(fileId);
  gfs.findOne({filename: fileId}, (err, file) => {
    if (err) {
      res.status(500);
    }

    // console.log(file);
    res.render('uploaded', {file: file});
  });

});

router.get('/download/:id', (req, res) => {
  let fileId = req.params.id;
  let conn = req.conn;
  let gfs = Grid(conn.db);

  let readStream = gfs.createReadStream({
    filename: fileId,
  }).pipe(res);
});

module.exports = router;
