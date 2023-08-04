import { useEffect } from 'react';
import { getGetUserUrl } from '../../../config/api/selectors';
import useFetch from '../../hooks/useFetch';
import { useAuthContext } from '../../context/auth/hook';
import { useNavigate } from 'react-router-dom';
import { getLoginPath, getNoFlightsMessage, getNoSavedFlightsMessage } from '../../../config/pages/selectors';
import { INAUTHED_ERROR, getUserErrorParser } from '../../utility/error-handling/getUserErrorParser';
import { getLoadingMessage } from '../../../config/messages/selectors';
import FlightsTable from '../../components/flights-table';
import { WeatherContextProvider } from '../../context/weather/provider';

import styles from './index.module.css';
import { useProfileContext } from '../../context/profile/hook';
import { SET_USER_FLIGHTS } from '../../context/profile/provider';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, initializing } = useAuthContext();
  const { loading: userLoading, data: userData, error: userError, get: getUser } = useFetch();
  const { userFlights, dispatch } = useProfileContext();
  const { id } = useParams();

  useEffect(() => {
    if (!initializing) {
      if (user) {
        getUser({
          url: getGetUserUrl(id),
          errorParser: getUserErrorParser,
          extraHeaders: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        getUser({ url: getGetUserUrl(id), errorParser: getUserErrorParser });
      }
    }
  }, [initializing, user]);

  useEffect(() => {
    console.log(userError)
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
      <div className={styles.getUserMessage}>
        {userLoading && <div>{getLoadingMessage()}</div>}
        {userError && userError != INAUTHED_ERROR && <div>{userError}</div>}
      </div>
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
          ) : (
            getNoSavedFlightsMessage()
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
