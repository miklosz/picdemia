const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('build'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/search/:query', (req, res) => res.send({ 
    pictures: 'Will be served here.',
    query: req.params.query
}));

app.get('/api/search', (req, res) => res.send({error: 'Please provide a valid search term!'}));

app.listen(8080, () => console.log('Server started!'));