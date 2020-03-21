import React from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';
import Hints from './Hints';
import styles from './App.module.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'new',
      query: '',
      hints: [],
      page: 1,
    };
    this.settings = {
      url: '/api/search/',
      options: {
        method: 'GET',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNextResults = this.handleNextResults.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { query } = this.state;
    if (query) {
      this.setState((prevState) => ({
        status: 'loading',
        results: [],
        hints: [...prevState.hints, query],
      }));
      this.fetchData(query);
    }
  }

  handleChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  handleLink(event, hintKey) {
    event.preventDefault();
    this.setState({
      query: hintKey,
      status: 'loading',
      results: [],
    });
    this.fetchData(hintKey);
  }

  handleNextResults(event) {
    event.preventDefault();
    const { query, page } = this.state;
    this.fetchData(`${query}/${page + 1}`);
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  }

  fetchData(query) {
    const { url, options } = this.settings;
    fetch(url + query, options)
      .then((resource) => resource.json())
      .then((data) => {
        this.setState((prevState) => ({
          results: prevState.results.concat(data.pictures),
          status: 'loaded',
          resultsQuery: data.query,
          total: data.total,
        }));
      })
      .catch((error) => {
        this.setState({ status: `Error fetching data ${error}` });
      });
  }

  render() {
    const { handleChange, handleSubmit, handleLink, handleNextResults } = this;
    const { status, query, hints, results, resultsQuery, total } = this.state;
    return (
      <div className={`${styles.wrapper} ${styles[status]}`}>
        <div className={styles.top}>
          <Header />
          <Search onChange={handleChange} onSubmit={handleSubmit} query={query} />
        </div>
        <main>
          {hints.length > 0 && <Hints onClick={(id) => handleLink(id)} hints={hints} />}
          {results && <Results query={resultsQuery} results={results} total={total} more={handleNextResults} status={status} />}
        </main>
      </div>
    );
  }
}
