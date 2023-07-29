import { useState } from 'react';
import { getEpgSearchLimit, getEpgSearchPlaceholder } from '../../../../../config/pages/selectors';
import { getSearchMatches } from '../utils/getSearchMatches';

import styles from './index.module.css';

function SearchBar({ programmes }) {
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query) {
      setResults(getSearchMatches(query, programmes, getEpgSearchLimit()));
    } else setResults([]);
  };

  return (
    <div className={styles.searchBar}>
      <label className={styles.searchLabel} htmlFor="epg-search">Search: &nbsp;</label>
      <div className={styles.searchContainer}>
        <input
          type="text"
          id="epg-search"
          className={styles.searchInput}
          onChange={handleSearch}
          placeholder={getEpgSearchPlaceholder()}
        />
        {!!results?.length && (
          <div className={styles.searchResults}>
            {results.map((result) => (
              <div key={result.id} className={styles.searchResult}>
                <p>{result.title}</p>
              </div>
            ))}
          </div>
        )}
       </div>
    </div>
  );
}

export default SearchBar;
