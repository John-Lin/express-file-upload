# express-file-upload

[ ![Codeship Status for John-Lin/express-file-upload](https://codeship.com/projects/9b233320-90fe-0133-c2a0-4e0b09ec4af6/status?branch=master)](https://codeship.com/projects/124506) [![Heroku](http://heroku-badge.herokuapp.com/?app=express-file-upload&style=flat)](https://express-file-upload.herokuapp.com/)

This is a file upload demonstration WEB Server build with ExpressJS and MongoDB GridFS deployed to Heroku.

The working example is running on [https://express-file-upload.herokuapp.com/](https://express-file-upload.herokuapp.com/)


# Run in Local

- Configure files

  Please modify filename `config/default.json.example` to `config/default.json`

-  Start the MongoDB

  Note: If you want to change default MongoDB connection setting which running on `localhost:27017` please modify the `config/default.json` file


-  Run the Web Server

```
npm start
```

- Try upload file on [http://localhost:3000](http://localhost:3000)

# Test

Currently, there is a very basic testing

```
npm test
```
