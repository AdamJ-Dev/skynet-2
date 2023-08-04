import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getGetEpgProgrammeUrl } from '../../../config/api/selectors';
import { getLoadingMessage } from '../../../config/messages/selectors';

import styles from './index.module.css';
import { useEffect, useState } from 'react';
import ProgrammeLocationIntro from './programme-location-intro';
import FlightsInfo from './flights-info';
import { JourneyContextProvider } from '../../context/journey/provider';
import { WeatherContextProvider } from '../../context/weather/provider';
import { NOT_FOUND, getProgrammeErrorParser } from '../../utility/error-handling/programmeErrorParser';
import { get404DefaultPath } from '../../../config/pages/selectors';

const ProgrammePage = () => {
  const { id } = useParams();
  const {
    loading: programmeLoading,
    data: programme,
    error: programmeError,
    get: getProgramme,
  } = useFetch(getGetEpgProgrammeUrl(id));
  const navigate = useNavigate();

  useEffect(() => {
    getProgramme({ errorParser: getProgrammeErrorParser });
  }, []);

  useEffect(() => {
    if (programmeError === NOT_FOUND) {
      navigate(get404DefaultPath());
    }
  }, [programmeError])

  return (
    <>
      {programmeLoading && <p>{getLoadingMessage()}</p>}
      {programmeError && programmeError !== NOT_FOUND && <p>{programmeError}</p>}
      {!!programme?.locations.length && (
        <>
          <ProgrammeLocationIntro programme={programme} />
          <JourneyContextProvider>
            <WeatherContextProvider>
              <FlightsInfo destination={programme.locations[0]} />
            </WeatherContextProvider>
          </JourneyContextProvider>
        </>
      )}
    </>
  );
};

export default ProgrammePage;
