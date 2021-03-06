import React, { useState, useEffect } from 'react';
import styles from './Results.module.css';
import Loader from './Loader';

export default function Results(props) {
  const { query, status, handleUpdate } = props;
  const [results, setResults] = useState({ pictures: [], total: 0 });
  const [page, setPage] = useState(1);
  const [responseQuery, setResponseQuery] = useState('');

  // fetching data moved here from parent component
  useEffect(() => {
    function fetchData() {
      const url = `/api/search/${query}/${page}`;
      const options = { method: 'GET' };

      if (query) {
        fetch(url, options)
          .then((resource) => resource.json())
          .then((data) => {
            if (responseQuery !== query) {
              // clear images from previous query
              setPage(1);
              setResults({ pictures: [] });
            }
            const pictureSet = (page > 1) ? results.pictures.concat(data.pictures) : data.pictures;
            setResults({
              pictures: pictureSet,
              total: data.total,
            });
            handleUpdate('loaded');
            setResponseQuery(data.query);
          })
          .catch((error) => {
            handleUpdate('error');
          });
      } else {
        handleUpdate('new');
      }
    }
    fetchData(query, page);
  }, [query, page]);

  // render
  const showCount = results.total > 0 ? results.total : 'no';

  if (status === 'error') return <Error />;
  if (status === 'loading') return <Loader />;
  return (
    <ResultsList
      showCount={showCount}
      query={query}
      results={results.pictures}
      total={results.total}
      page={() => setPage(page + 1)}
    />
  );
}


function ListItem(props) {
  const { thumbnail, title, pageUrl, service } = props.item;
  return (
    <li>
      <a href={pageUrl} target="_blank" rel="noopener noreferrer">
        <img src={thumbnail} alt={`${title} from ${service}`} />
        <h4 className={styles.detailsTop}>{title}</h4>
      </a>
    </li>
  );
}

function Error() {
  return (
    <div className={styles.error}>
      <p>An error occured. Please try again later</p>
    </div>
  );
}

function ResultsList(props) {
  const { showCount, query, results, total, page } = props;

  return (
    <div className={styles.results}>
      <h2 className={styles[showCount]}>
        {showCount} pictures for: <b>{query}</b> found
      </h2>
      {showCount > 0 && (
        <ul className={styles.ul}>
          {results.map((el) => <ListItem item={el} key={el.id} />)}
        </ul>
      )}
      {(results.length < total)
        && <button className={styles.more} onClick={page} type="button">Show more</button>}
    </div>
  );
}
