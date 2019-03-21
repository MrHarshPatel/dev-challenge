const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const server = app.listen(3000);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.render('index');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function(req, res){
  console.log(req.body.address);
  res.contentType('text');

  //Potentially would send to mongodb database and change the response sent
  res.send("Successfully added to mongodb database");
});
