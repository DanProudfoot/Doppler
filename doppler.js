var express = require('express');
var cors = require('cors');

var app = express();

app.use(express.static(__dirname + '/dist'))
app.use(cors());

app.get('/', function(req, res) {
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
    res.render('index.html');
});

var server = app.listen(process.env.PORT || 80, function() {
	console.log('\nServer ready on port %d\n', server.address().port);
});
