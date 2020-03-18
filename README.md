# Picdemia - picture finder
Recruitment task - Node + React + Webpack

## The plan
* Developement with webpack dev server, express, react build
* Prod optimized for mydevil (folder structure + main entrypoint app.js!)

### Frontend
* Two components - search and results list
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