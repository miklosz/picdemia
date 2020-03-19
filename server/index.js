require('dotenv').config();
const express = require('express');
const bent = require('bent')

const app = express();

app.use(express.static('build'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/search/:query', async (req, res) => {
  const query = req.params.query;
  const key_giphy = process.env.API_KEY_GIPHY;
  const key_pixabay = process.env.API_KEY_PIXABAY;
  const count = 5;
  const getJSON = bent('json')

  console.log(`https://pixabay.com/api/?key=${key_pixabay}&image_type=allto&pretty=true&per_page=${count}&q=${query}`);

  // try/catch should be for two api's separately - now when one fails, both fail
  try {
    let giphy = await getJSON(`https://api.giphy.com/v1/gifs/search?api_key=${key_giphy}&limit=${count}&offset=0&rating=G&lang=en&q=${query}`);
    let pixabay = await getJSON(`https://pixabay.com/api/?key=${key_pixabay}&image_type=allto&pretty=true&per_page=${count}&q=${query}`);
    console.log(giphy.data.length);
    console.log(pixabay.hits.length);
   
    // sanitaze data

    // combine into one object

    // optionally - cache / store on the server

    // serve to frontend

    let result = {
      query: req.params.query,
      pictures: {
        g: giphy.data.length,
        p: pixabay.hits.length
      }
    }
    res.json(result);

  } catch (e) {
    console.error('gotchya',e)
    res.send(e)
  }

});

app.get('/api/search', (req, res) => res.send({ error: 'Please provide a valid search term!' }));
app.get('/api', (req, res) => res.send({ error: 'Some minimalistic API documentation will be shown here' }));

app.listen(8080, () => console.log('Server started!'));