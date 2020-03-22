import React, { useState, useEffect} from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';
import Hints from './Hints';
import styles from './App.module.css';

function App() {
  const [status, setStatus] = useState('new');
  const [query, setQuery] = useState('');
  const [resultsQuery, setResultsQuery] = useState('');

  console.log(query,resultsQuery)

  function handleSubmit(event) {
    event.preventDefault();
    console.log(query)
    if (query) {
      setResultsQuery(query);
      setStatus('loading');
      // update (clear) results
      // update hints (add current query)
      // fetching data moved to results component
    }
  }

  // add hints handler... or handle hints inside the component, based on current query
  
  return (
    <div className={`${styles.wrapper} ${styles[status]}`}>
      <div className={styles.top}>
        <Header />
        <Search 
          onChange={(ev) => setQuery(ev.target.value)} 
          onSubmit={(ev) =>  handleSubmit(ev)} 
          query={query} />
      </div>
      <main>
        {/* <Hints hints={hints} query={resultsQuery} />} */}
        {status != 'new' && <Results query={resultsQuery} status={status} />}
        {/* <Results query={resultsQuery} status={status} /> */}
      </main>
    </div>
  );
}

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       status: 'new',
//       query: '',
//       hints: [],
//       page: 1,
//     };
//     this.settings = {
//       url: '/api/search/',
//       options: {
//         method: 'GET',
//       },
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleNextResults = this.handleNextResults.bind(this);
//     this.handleLink = this.handleLink.bind(this);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const { query } = this.state;
//     if (query) {
//       this.setState((prevState) => ({
//         status: 'loading',
//         results: [],
//         hints: [...prevState.hints, query],
//       }));
//       this.fetchData(query);
//     }
//   }

//   handleChange(event) {
//     this.setState({
//       query: event.target.value,
//     });
//   }

//   handleLink(hintKey, event) {
//     event.preventDefault();
//     this.setState({
//       query: hintKey,
//       status: 'loading',
//       results: [],
//     });
//     this.fetchData(hintKey);
//   }

//   handleNextResults(event) {
//     event.preventDefault();
//     const { query, page } = this.state;
//     this.fetchData(`${query}/${page + 1}`);
//     this.setState((prevState) => ({
//       page: prevState.page + 1,
//     }));
//   }

//   fetchData(query) {
//     const { url, options } = this.settings;
//     fetch(url + query, options)
//       .then((resource) => resource.json())
//       .then((data) => {
//         this.setState((prevState) => ({
//           results: prevState.results.concat(data.pictures),
//           status: 'loaded',
//           resultsQuery: data.query,
//           total: data.total,
//         }));
//       })
//       .catch((error) => {
//         this.setState({
//           status: 'error',
//           error: `Local fetching data. ${error}`,
//         });
//       });
//   }

//   render() {
//     const { handleChange, handleSubmit, handleLink, handleNextResults } = this;
//     const { status, query, hints, results, resultsQuery, total } = this.state;
//     return (
//       <div className={`${styles.wrapper} ${styles[status]}`}>
//         <div className={styles.top}>
//           <Header />
//           <Search onChange={handleChange} onSubmit={handleSubmit} query={query} />
//         </div>
//         <main>
//           {hints.length > 0 && <Hints onClick={handleLink} hints={hints} />}
//           {results && <Results query={resultsQuery} results={results} total={total} more={handleNextResults} status={status} />}
//         </main>
//       </div>
//     );
//   }
// }

export default App;
