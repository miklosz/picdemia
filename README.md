# Picdemia - picture finder
Recruitment task - Node + React + Webpack

## Basic info
`yarn start` or `yarn prod`- production build & serve  
`yarn dev` - devel  
Live preview: http://picdemia.borzyszkowski.org  

To run the project API keys are needed - stored in the .env file (API_KEY_GIPHY, API_KEY_PIXABAY). Those or not included in repo ;)

## The plan
* Developement with webpack dev server, express, react build

### Frontend
* Two core components - search and results list, packed in App Component
* Search rather onSubmit, not onChange to cut down the API usage
* Nice to have - some filtering (image size, type etc)
* Nice to have - search history & autocomplete

### Backend
* fetch the query from frontend
* get image URLs from both API, build a results array
* for every image try to actually download it (check if exists)
* serve the result (reponse as JSON)
* nice to have: cache the results for queries, serve without calling the 2 APIs if exists locally
* nice to have: serve images from local backend if cached

## Actual steps taken
* Project & app structure planned. Folders & files created, NPM initialized, required packages added.
* Dev Access to APIs obtained
* Mockup endpoint created with express
* Webpack configured (babel dependencies updated & fixed)
* React client app scaffolding added
* React components for Search and Result added with event handlers
* Fake JSON response added to server to test req/res based on query from client search component
* Acutal fetch from external APIs, formatting data and serving it to the client
* Layout build with CSS modules. Actually - afterwards I think - SASS with single output file would be cleaner and easier to maintain in this case
* Search history added with option to use it again for search (known as hints)
* ES Lint added. Manually usage from yarn test command, not included in webpack bundle
* Loaders and error messages added
* Class - based version frozen, rewriting to hook - based version


## What more could (or can) be done
* Tests!
* Pagination, filtering
* Adding router to store history and allow to open search results directly from link
* Serve actuall files, not only their URLs through proxy server
* Having that: the option to directly dowload file (almost did it :/ )
* ...and caching both files and search results on the proxy server
* Saving data locally
