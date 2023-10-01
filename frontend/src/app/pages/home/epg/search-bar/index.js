import { useCallback, useEffect, useState } from 'react';
import {
  getEpgSearchLimit,
  getEpgSearchPlaceholder,
} from '../../../../../config/pages/selectors';
import { getSearchMatches } from '../utils/getSearchMatches';
import { getAiringInfo } from '../utils/getAiringInfo';
import DialogBox from '../../../../components/dialog-box';
import ProgrammeInfo from '../programme-info';
import styles from './index.module.css';
import { hasLength } from '../../../../../lib/array/length';

const SearchBar = ({ programmes }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  const handleSearch = useCallback(
    (e) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      if (newQuery) {
        setResults(getSearchMatches(newQuery, programmes, getEpgSearchLimit()));
      } else {
        setResults([]);
      }
    },
    [programmes]
  );

  const handleSelectProgramme = useCallback((result) => {
    setSelectedProgramme(result);
    setDialogOpen(true);
  }, []);

  const resetSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setSelectedProgramme(null);
  }, []);

  useEffect(() => {
    if (!dialogOpen) {
      resetSearch();
    }
  }, [dialogOpen, resetSearch]);

  return (
    <div className={styles.searchBar}>
      <label className={styles.searchLabel} htmlFor="epg-search">
        Search: &nbsp;
      </label>
      <div className={styles.searchContainer}>
        <input
          type="text"
          id="epg-search"
          className={styles.searchInput}
          value={query}
          onChange={handleSearch}
          placeholder={getEpgSearchPlaceholder()}
          autoComplete="off"
        />
        {hasLength(results) && (
          <div className={styles.searchResults}>
            {results.map((result) => (
              <div
                key={result.id}
                className={styles.searchResult}
                onClick={() => handleSelectProgramme(result)}
              >
                <p>{result.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedProgramme && (
        <DialogBox
          content={
            <ProgrammeInfo
              programme={selectedProgramme}
              airingInfo={getAiringInfo(selectedProgramme.title, programmes)}
            />
          }
          closer={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
