import { useEffect, useState } from 'react';
import { getGetAirportsUrl } from '../../../../../../config/api/selectors';
import {
  getAirportsSearchLimit,
  getAirportsSearchPlaceholder,
} from '../../../../../../config/pages/selectors';
import {
  getInvalidSearchQueryMessage,
  getLoadingMessage,
  getNoSearchResultsMessage,
} from '../../../../../../config/messages/selectors';
import { formatAirportName } from '../utils/formatAirportName';
import { SET_DEPARTURE_AIRPORT } from '../../../../../context/journey/provider';
import { useJourneyContext } from '../../../../../context/journey/hook';
import useFetch from '../../../../../hooks/useFetch';
import { isValidQuery } from './utils/validateQuery';
import styles from './index.module.css';

const AirportsSearchBar = () => {
  const {
    loading: airportsLoading,
    data: airports,
    error: airportsError,
    get: getAirports,
  } = useFetch();
  const { dispatch } = useJourneyContext();

  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query) {
      if (isValidQuery(query)) {
        getAirports({ url: getGetAirportsUrl(query) });
      } else {
        setMessage(getInvalidSearchQueryMessage());
      }
    }
  };

  const handleClickResult = (result) => {
    dispatch({ type: SET_DEPARTURE_AIRPORT, payload: result });
    setQuery('');
  };

  useEffect(() => {
    setMessage('');
    setResults([]);
  }, [query]);

  useEffect(() => {
    if (airports) {
      if (airports.length) {
        setMessage('');
        setResults(airports.slice(0, getAirportsSearchLimit()));
      } else {
        setMessage(getNoSearchResultsMessage());
      }
    }
  }, [airports]);

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

  return (
    <div className={styles.searchBarContainer}>
      <button onClick={() => handleSearch()}>Go</button>
      <div className={styles.searchContainer}>
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
                className={styles.searchResult}
                onClick={() => handleClickResult(result)}
                key={result.airportCode}
              >
                <p>{formatAirportName(result)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AirportsSearchBar;
