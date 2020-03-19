require('dotenv').config();
const express = require('express');
const bent = require('bent')

const app = express();

// const gstatic = require('../server/g.json');
// const pstatic = require('../server/p.json');

app.use(express.static('build'));

// middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/search/:query', async (req, res) => {
  const query = req.params.query;
  const getJSON = bent('json');
  const count = 10;
  const url_giphy = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY_GIPHY}&limit=${count}&offset=0&rating=G&lang=en&q=${query}`;
  const url_pixabay =`https://pixabay.com/api/?key=${process.env.API_KEY_PIXABAY}&image_type=allto&pretty=true&per_page=${count}&q=${query}`;
  let pictures = [];

  // const url_giphy = 'http://localhost:8080/api/g';
  // const url_pixabay = 'http://localhost:8080/api/p';

  const fetchAPI = (url) => {
    let results = getJSON(url).catch((error) => {
      console.log('Error in fetching data',error.message)
      return { 
        error: 
          { message: error.message, code: error.statusCode }
        }
    });
    return results;
  }

  // fetch data from remote API
  let giphy = await fetchAPI(url_giphy);
  let pixabay = await fetchAPI(url_pixabay);

  // format data to desired format
  giphy.data.map(e => {
    pictures.push({
      title: e.title,
      pageUrl: e.url,
      thumbnail: e.images.downsized.url,
      full: e.images.original.url,
      service: 'giphy'
    })
  })

  pixabay.hits.map(e => {
    pictures.push({
      title: e.tags,
      pageUrl: e.pageURL,
      thumbnail: e.previewURL,
      full: e.largeImageURL,
      service: 'pixabay'
    })
  })

  // expose formatted data to client
  res.json({
    query: req.params.query,
    pictures: pictures
  });

});

app.get('/api/search', (req, res) => res.send({ error: 'Please provide a valid search term!' }));

// temp "cache"
// app.get('/api/g', (req, res) => res.send(gstatic));
// app.get('/api/p', (req, res) => res.send(pstatic));

app.get('/api', (req, res) => res.send({ error: 'Some minimalistic API documentation will be shown here' }));

app.listen(8080, () => console.log('Server started!'));