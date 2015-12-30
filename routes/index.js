'use strict';
let express = require('express');
let multer  = require('multer');
let upload = multer({ dest: './uploads/'});
let router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.single('myUploadFile'), (req, res) => {
  console.log(req.file);
  res.render('success');
});

module.exports = router;
