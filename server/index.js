require('dotenv').config();
const express = require('express');
const bent = require('bent');
const app = express();

app.use(express.static('build'));

// middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/search/:query/:page?/:count?', async (req, res) => {
  const query = req.params.query;
  const getJSON = bent('json');
  let count = req.params.count > 3 && req.params.count < 200 ? req.params.count : 10; // pixabay limit - results per page 3 - 200
  let page = req.params.page? req.params.page : 1;
  let offset = count*page - count;
  const url_giphy = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY_GIPHY}&limit=${count}&offset=${offset}&rating=G&lang=en&q=${query}`;
  const url_pixabay =`https://pixabay.com/api/?key=${process.env.API_KEY_PIXABAY}&image_type=allto&pretty=true&per_page=${count}&page=${page}&q=${query}`;
  let pictures = [];

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
      id: e.id,
      title: e.title,
      pageUrl: e.url,
      thumbnail: e.images.downsized.url,
      full: e.images.original.url,
      service: 'giphy',
    })
  })

  pixabay.hits.map(e => {
    pictures.push({
      id: e.id,
      title: e.tags,
      pageUrl: e.pageURL,
      thumbnail: e.webformatURL,
      full: e.largeImageURL,
      service: 'pixabay'
    })
  })

  let total = (giphy.data.length > 0 ? giphy.pagination.total_count : 0)  + pixabay.totalHits;

  // expose formatted data to client
  res.json({
    query: req.params.query,
    pictures: pictures,
    total: total
  });

});

app.get('/api/search', (req, res) => res.send({ error: 'Please provide a valid search term! Accepted parameters: :query/:page?/:count?' }));
app.get('/api', (req, res) => res.send("This API has a single endpoint: /search. Accepted parameters: :query/:page?/:count?"));

app.listen(8080, () => console.log('Server started!'));