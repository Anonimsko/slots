const path = require('path');
const express = require('express');
const pug = require('pug');
const app = express();
const port = 3000;

// Add the public folder to the server.
app.use(express.static('public'));

// Add templates.
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.get('/', (request, response) => {
    response.render('index', {
        date: new Date().toDateString()
    });
});

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
});