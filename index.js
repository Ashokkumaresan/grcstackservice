var express=require('express');
var app= express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
var port=process.env.PORT || 3000;
app.use(express.static(__dirname));

app.use(require('./routes/index'));
app.listen(port);
