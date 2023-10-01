import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGetEpgProgrammeUrl } from '../../../config/api/selectors';
import { getLoadingMessage } from '../../../config/messages/selectors';
import {
  NOT_FOUND,
  getProgrammeErrorParser,
} from '../../utility/error-handling/programmeErrorParser';
import { get404DefaultPath } from '../../../config/pages/selectors';
import { getLocation, hasLocation } from '../../utility/programmes/location';
import { JourneyContextProvider } from '../../context/journey/provider';
import useFetch from '../../hooks/useFetch';
import FlightsInfo from './flights-info';
import ProgrammeLocationIntro from './programme-location-intro';

const ProgrammePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    loading: programmeLoading,
    data: programme,
    error: programmeError,
    get: getProgramme,
  } = useFetch(getGetEpgProgrammeUrl(id));

  useEffect(() => {
    getProgramme({ errorParser: getProgrammeErrorParser });
  }, [getProgramme]);

  useEffect(() => {
    const programmeDoesNotExist = programmeError === NOT_FOUND;
    const programmeLacksLocation = programme && !hasLocation(programme);
    if (programmeDoesNotExist || programmeLacksLocation) {
      navigate(get404DefaultPath());
    }
  }, [programme, programmeError, navigate]);

  return (
    <>
      {programmeLoading && <p>{getLoadingMessage()}</p>}
      {programmeError && programmeError !== NOT_FOUND && <p>{programmeError}</p>}
      {programme && hasLocation(programme) && (
        <>
          <ProgrammeLocationIntro programme={programme} />
          <JourneyContextProvider>
            <FlightsInfo destination={getLocation(programme)} />
          </JourneyContextProvider>
        </>
      )}
    </>
  );
};

export default ProgrammePage;
