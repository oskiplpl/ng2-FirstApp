//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/first-app'));

app.get('/*', function (req, res) {
    console.log('Path ' + __dirname + '/dist/first-app/index.html');
    res.sendFile(path.join(__dirname + '/dist/first-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);