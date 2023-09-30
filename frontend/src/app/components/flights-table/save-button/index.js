import { getPostUserFlightUrl } from '../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../config/messages/selectors';
import { useAuthContext } from '../../../context/auth/hook';
import { useJourneyContext } from '../../../context/journey/hook';
import useFetch from '../../../hooks/useFetch';
import { getAuthHeader } from '../../../utility/user/authRequest';

import styles from './index.module.css';

const SaveFlightButton = ({ flight }) => {
  const { user } = useAuthContext();
  const {
    loading: saveLoading,
    data: saveData,
    error: saveError,
    post: saveFlight,
  } = useFetch();
  const { departureAirport, arrivalAirport } = useJourneyContext();

  const handleSaveFlight = () => {
    const departureCoordinates = departureAirport.coordinates;
    const arrivalCoordinates = arrivalAirport.coordinates;
    const flightEntity = {
      ...flight,
      homeCoordinates: departureCoordinates,
      awayCoordinates: arrivalCoordinates,
    };
    saveFlight(flightEntity, {
      url: getPostUserFlightUrl(user.id),
      extraHeaders: { ...getAuthHeader(user.token) },
    });
  };

  if (saveLoading) return getLoadingMessage();
  if (saveError) return saveError;
  if (saveData) return 'Saved.';

  return (
    <button className={styles.saveBtn} onClick={handleSaveFlight}>
      +
    </button>
  );
};

export default SaveFlightButton;
