import React, { useState } from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';
import Hints from './Hints';
import styles from './App.module.css';

function App() {
  const [status, setStatus] = useState('new');
  const [query, setQuery] = useState('');
  const [resultsQuery, setResultsQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (query) {
      setResultsQuery(query);
      setStatus('loading');
      setQuery('');
    }
  }

  function handleUpdate(status) {
    setStatus(status);
  }

  function handleHint(key, ev) {
    setResultsQuery(key);
    setStatus('loading');
  }

  return (
    <div className={`${styles.wrapper} ${styles[status]}`}>
      <div className={styles.top}>
        <Header />
        <Search
          onChange={(ev) => setQuery(ev.target.value)}
          onSubmit={(ev) => handleSubmit(ev)}
          query={query}
        />
      </div>
      {status !== 'new'
      && (
      <main>
        <Hints query={resultsQuery} onClick={handleHint} />
        <Results query={resultsQuery} status={status} handleUpdate={handleUpdate} />
      </main>
      )}
    </div>
  );
}

export default App;
