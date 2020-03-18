const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('build'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/search/:query', (req, res) => { 
  console.log(req.params.query);
  res.send({ 
    pictures: [
      {
        description: 'Test 1',
        url: 'https://giphy.com/gifs/breakfast-pancakes-syrup-5zu5JovduWFBS',
        imgSrc: 'https://media0.giphy.com/media/5zu5JovduWFBS/100_s.gif?cid=5b3d92eb8d3067ea52afdd2a13ca1efb580c0c39cc0f65a1&rid=100_s.gif'
      },
      {
        description: 'Test 2',
        url: 'https://pixabay.com/photos/pancakes-pancake-crepe-s%C3%BCsspeise-2020863/',
        imgSrc: 'https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863_150.jpg'
      },
    ],
    query: req.params.query
  })
});

app.get('/api/search', (req, res) => res.send({error: 'Please provide a valid search term!'}));

app.listen(8080, () => console.log('Server started!'));