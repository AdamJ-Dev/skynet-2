import { useEffect, useState } from 'react';
import { getGetAirportsUrl } from '../../../../../config/api/selectors';
import { getAirportsSearchLimit, getAirportsSearchPlaceholder } from '../../../../../config/pages/selectors';
import useFetch from '../../../../hooks/useFetch';
import styles from './index.module.css';
import {
  getInvalidSearchQueryMessage,
  getLoadingMessage,
  getNoSearchResultsMessage,
} from '../../../../../config/messages/selectors';
import { isValidQuery } from './utils/validateQuery';

const AirportsSearchBar = ({ setDepartureAirportCode }) => {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);
  const { loading: airportsLoading, data: airports, error: airportsError, get } = useFetch('');

  useEffect(() => {
    if (airportsLoading) {
      setMessage(getLoadingMessage());
    }
  }, [airportsLoading]);

  useEffect(() => {
    if (airportsError) {
      setMessage(airportsError);
    }
  }, [airportsError]);

  useEffect(() => {
    console.log(airports)
    if (airports?.length) {
      setMessage('');
      setResults(airports.slice(0, getAirportsSearchLimit()));
    } else if (airports) {
      setMessage(getNoSearchResultsMessage());
    }
  }, [airports]);

  useEffect(() => {
    setResults([]);
  }, [query]);

  const handleSearch = async () => {
    if (query) {
      if (isValidQuery(query)) {
        await get({ url: getGetAirportsUrl(query) });
      } else {
        setMessage(getInvalidSearchQueryMessage());
      }
    }
  };

  const handleClickResult = (result) => {
    if (result.airportCode) {
      setDepartureAirportCode(result.airportCode);
      setQuery('');
    }
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <button onClick={() => handleSearch()}>Search</button>
        <input
          type="text"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={getAirportsSearchPlaceholder()}
          autoComplete="off"
        />
        <div className={styles.searchResults}>
          {message ? (
            <div className={styles.messageResult}>{message}</div>
          ) : (
            !!results.length &&
            results.map((result) => (
              <div
                key={result.airportCode}
                className={styles.searchResult}
                onClick={() => handleClickResult(result)}
              >
                <p>
                  {result.name} ({result.airportCode})
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AirportsSearchBar;
