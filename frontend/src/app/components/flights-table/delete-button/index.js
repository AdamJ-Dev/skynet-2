import { useCallback, useEffect } from 'react';
import { getDeleteUserFlightUrl } from '../../../../config/api/selectors';
import { getLoadingMessage } from '../../../../config/messages/selectors';
import { useAuthContext } from '../../../context/auth/hook';
import { useProfileContext } from '../../../context/profile/hook';
import useFetch from '../../../hooks/use-fetch';
import { SET_USER_FLIGHTS } from '../../../context/profile/provider';

import { getAuthHeader } from '../../../utility/user/auth-request';
import styles from './index.module.css';

const DeleteFlightButton = ({ flightId }) => {
  const {
    loading: deleteLoading,
    data: deleteData,
    error: deleteError,
    del: deleteFlight,
  } = useFetch();
  const { user } = useAuthContext();
  const { dispatch, userFlights } = useProfileContext();

  const handleDeleteFlight = useCallback(() => {
    deleteFlight({
      url: getDeleteUserFlightUrl(user.id, flightId),
      extraHeaders: { ...getAuthHeader(user.token) },
    });
  }, [user, flightId, deleteFlight]);

  useEffect(() => {
    if (deleteData) {
      dispatch({
        type: SET_USER_FLIGHTS,
        payload: userFlights.filter((flight) => flight.flightId !== flightId),
      });
    }
  }, [deleteData, userFlights, flightId, dispatch]);

  if (deleteLoading) return getLoadingMessage();
  if (deleteError) return deleteError;

  return (
    <button className={styles.deleteBtn} onClick={handleDeleteFlight}>
      -
    </button>
  );
};

export default DeleteFlightButton;
