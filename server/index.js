require('dotenv').config();
const express = require('express');
const https = require('https');

const app = express();

app.use(express.static('build'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/search/:query', (req, res) => {
  const query = req.params.query;
  const key_giphy = process.env.API_KEY_GIPHY;
  const key_pixabay = process.env.API_KEY_PIXABAY;

  https.get(`https://api.giphy.com/v1/gifs/search?api_key=${key_giphy}&limit=5&offset=0&rating=G&lang=en&q=${query}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      console.log(JSON.parse(data));
      let giphy = JSON.parse(data);
      res.send(giphy)
    });


  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })


  // https.get(`https://api.giphy.com/v1/gifs/search?api_key=${key_giphy}&limit=10&offset=0&rating=G&lang=en&q=${query}`,
  //   resp => {
  //     resp.on('end', () => {
  //       console.log(data);
  //     });
  //   } 
  // )

  // res.send({
  //   // pictures: [
  //   //   {
  //   //     description: 'Test 1',
  //   //     url: 'https://giphy.com/gifs/breakfast-pancakes-syrup-5zu5JovduWFBS',
  //   //     imgSrc: 'https://media0.giphy.com/media/5zu5JovduWFBS/100_s.gif?cid=5b3d92eb8d3067ea52afdd2a13ca1efb580c0c39cc0f65a1&rid=100_s.gif'
  //   //   },
  //   //   {
  //   //     description: 'Test 2',
  //   //     url: 'https://pixabay.com/photos/pancakes-pancake-crepe-s%C3%BCsspeise-2020863/',
  //   //     imgSrc: 'https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863_150.jpg'
  //   //   },
  //   // ],
  //   giphy: giphy,
  //   query: req.params.query
  // })
});

app.get('/api/search', (req, res) => res.send({ error: 'Please provide a valid search term!' }));

app.listen(8080, () => console.log('Server started!'));