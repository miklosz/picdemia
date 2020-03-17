const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('build'));
app.get('/api/search/:query', (req, res) => res.send({ 
    pictures: 'Will be served here',
    query: req.params.query
}));
app.listen(8080, () => console.log('Server started!'));