import { useEffect, useState } from 'react';
import { getEpgSearchLimit, getEpgSearchPlaceholder } from '../../../../../config/pages/selectors';
import { getSearchMatches } from '../utils/getSearchMatches';

import styles from './index.module.css';
import DialogBox from '../../../../components/dialog-box';
import ProgrammeInfo from '../programme-info';
import { getAiringInfo } from '../utils/getAiringInfo';

const SearchBar = ({ programmes }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isProgrammeDialogOpen, setIsProgrammeDialogOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  useEffect(() => {
    if (!isProgrammeDialogOpen) {
      setQuery('');
      setSelectedProgramme(null);
      setResults([]);
    }
  }, [isProgrammeDialogOpen]);

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery) {
      setResults(getSearchMatches(newQuery, programmes, getEpgSearchLimit()));
    } else setResults([]);
  };

  const handleClick = (result) => {
    setSelectedProgramme(result);
    setIsProgrammeDialogOpen(true);
  };

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
        {!!results.length && (
          <div className={styles.searchResults}>
            {results.map((result) => (
              <div key={result.id} className={styles.searchResult} onClick={() => handleClick(result)}>
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
          isOpen={isProgrammeDialogOpen}
          setIsOpen={setIsProgrammeDialogOpen}
        />
      )}
    </div>
  );
};

export default SearchBar;
