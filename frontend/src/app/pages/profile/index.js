import { useEffect } from 'react';
import { getGetUserUrl } from '../../../config/api/selectors';
import useFetch from '../../hooks/useFetch';
import { useAuthContext } from '../../context/auth/hook';
import { useNavigate } from 'react-router-dom';
import { getLoginPath, getNoFlightsMessage, getNoSavedFlightsMessage } from '../../../config/pages/selectors';
import { INAUTHED_ERROR } from '../../utility/error-handling/getUserErrorParser';
import { getLoadingMessage } from '../../../config/messages/selectors';
import FlightsTable from '../../components/flights-table';
import { WeatherContextProvider } from '../../context/weather/provider';

import styles from './index.module.css';
import { useProfileContext } from '../../context/profile/hook';
import { SET_USER_FLIGHTS } from '../../context/profile/provider';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, initializing } = useAuthContext();
  const { loading: userLoading, data: userData, error: userError, get: getUser } = useFetch();
  const { userFlights, dispatch } = useProfileContext();

  useEffect(() => {
    if (!initializing & !user) {
      navigate(getLoginPath());
    }
    if (user) {
      getUser({ url: getGetUserUrl(user.id), extraHeaders: { Authorization: `Bearer ${user.token}` } });
    }
  }, [user]);

  useEffect(() => {
    if (userError === INAUTHED_ERROR) {
      navigate(getLoginPath());
    }
  }, [userError]);

  useEffect(() => {
    if (userData) {
      dispatch({ type: SET_USER_FLIGHTS, payload: userData.flights });
    }
  }, [userData]);

  return (
    <>
      {userLoading && <div>{getLoadingMessage()}</div>}
      {userError && userError != INAUTHED_ERROR && <div>{userError}</div>}
      {userData && (
        <div className={styles.profilePageContainer}>
          <p>
            <strong>Active User:</strong> {userData.firstName} {userData.lastName}
          </p>
          <p>
            <strong>Your saved flights:</strong>
          </p>
          {!!userFlights.length ? (
            <WeatherContextProvider>
              <div className={styles.tableContainer}>
                <FlightsTable flights={userFlights} savable={false} deletable={true} />
              </div>
            </WeatherContextProvider>
          ): getNoSavedFlightsMessage()}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
