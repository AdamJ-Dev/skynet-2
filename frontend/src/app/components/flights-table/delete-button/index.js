import { useEffect } from 'react';
import { getDeleteUserFlightUrl } from '../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../config/messages/selectors';
import { useAuthContext } from '../../../context/auth/hook';
import { useProfileContext } from '../../../context/profile/hook';
import useFetch from '../../../hooks/useFetch';
import { SET_USER_FLIGHTS } from '../../../context/profile/provider';

import styles from './index.module.css';

const DeleteFlightButton = ({ flightId }) => {
  const { user } = useAuthContext();
  const { loading: deleteLoading, data: deleteData, error: deleteError, del: deleteFlight } = useFetch('');
  const { dispatch, userFlights } = useProfileContext();

  const handleDeleteFlight = () => {
    deleteFlight({
      url: getDeleteUserFlightUrl(user.id, flightId),
      extraHeaders: { Authorization: `Bearer ${user.token}` },
    });
  };

  useEffect(() => {
    if (deleteData) {
      dispatch({
        type: SET_USER_FLIGHTS,
        payload: userFlights.filter((flight) => flight.flightId != flightId),
      });
    }
  }, [deleteData]);

  if (deleteLoading) return getLoadingMessage();
  if (deleteError) return deleteError;

  return <button className={styles.deleteBtn} onClick={() => handleDeleteFlight()}>-</button>;
};

export default DeleteFlightButton;
