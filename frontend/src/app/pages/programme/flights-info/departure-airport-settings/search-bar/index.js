import { useEffect, useState } from 'react';
import { getGetAirportsUrl } from '../../../../../../config/api/selectors';
import {
  getAirportsSearchLimit,
  getAirportsSearchPlaceholder,
} from '../../../../../../config/pages/selectors';
import useFetch from '../../../../../hooks/useFetch';
import styles from './index.module.css';
import {
  getInvalidSearchQueryMessage,
  getLoadingMessage,
  getNoSearchResultsMessage,
} from '../../../../../../config/messages/selectors';
import { isValidQuery } from './utils/validateQuery';
import { useJourneyContext } from '../../../../../context/journey/hook';
import { SET_DEPARTURE_AIRPORT } from '../../../../../context/journey/provider';
import { formatAirportName } from '../utils/formatAirportName';

const AirportsSearchBar = () => {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);
  const { dispatch } = useJourneyContext();
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
      dispatch({ type: SET_DEPARTURE_AIRPORT, payload: result });
      setQuery('');
    }
  };

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
                key={result.airportCode}
                className={styles.searchResult}
                onClick={() => handleClickResult(result)}
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
