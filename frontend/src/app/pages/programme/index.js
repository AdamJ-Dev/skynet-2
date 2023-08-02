import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getGetEpgProgrammeUrl } from '../../../config/api/selectors';
import { getLoadingMessage } from '../../../config/messages/selectors';

import styles from './index.module.css';
import { useEffect, useState } from 'react';
import ProgrammeLocationIntro from './programme-location-intro';
import FlightsInfo from './flights-info';
import { JourneyContextProvider } from '../../context/journey/provider';

const ProgrammePage = () => {
  const { id } = useParams();
  const {
    loading: programmeLoading,
    data: programme,
    error: programmeError,
    get: getProgramme,
  } = useFetch(getGetEpgProgrammeUrl(id));

  useEffect(() => {
    getProgramme();
  }, []);

  return (
    <>
      {programmeLoading && <p>{getLoadingMessage()}</p>}
      {programmeError && <p>{programmeError}</p>}
      {programme?.location && (
        <>
          <ProgrammeLocationIntro programme={programme} />
          <JourneyContextProvider>
            <FlightsInfo destination={programme.location} />
          </JourneyContextProvider>
        </>
      )}
    </>
  );
};

export default ProgrammePage;
