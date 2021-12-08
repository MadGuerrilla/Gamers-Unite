var express = require('express');
var nunjucks = require('express-nunjucks');
var app = express();
var router = express.Router();
var path = require('path');
var dirPath = __dirname + '/views/';

// Default extension of template files.
app.set('view engine', 'html');

// Templates in this directory will override the application templates.
app.set ('views', path.join(__dirname, '/views/'));

app.use('/',router);

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/assets', express.static(__dirname + '/docs/assets'));

// Configuring the template system.
nunjucks.setup({
    autoescape: true,
    watch: true,
    noCache: true,
    tags: {
      variableStart: '<$',
      variableEnd: '$>'
    }
}, app);

router.get('/',function(req,res){
  res.render(dirPath + 'index.html');
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on port ' + port);
});
