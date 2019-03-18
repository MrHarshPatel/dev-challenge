const express = require('express');
const app = express();
const server = app.listen(3000);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.render('index');
});
