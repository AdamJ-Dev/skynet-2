import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGetUserUrl } from '../../../config/api/selectors';
import { getLoginPath } from '../../../config/pages/selectors';
import {
  INAUTHED_ERROR,
  getUserErrorParser,
} from '../../utility/error-handling/get-user-error-parser';
import { getLoadingMessage } from '../../../config/messages/selectors';
import { getAuthHeader } from '../../utility/user/auth-request';
import { SET_USER_FLIGHTS } from '../../context/profile/provider';
import { useProfileContext } from '../../context/profile/hook';
import { useAuthContext } from '../../context/auth/hook';
import useFetch from '../../hooks/use-fetch';
import styles from './index.module.css';
import SavedFlights from './saved-flights';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id: requestedUserId } = useParams();
  const {
    loading: userLoading,
    data: userData,
    error: userError,
    get: getRequestedUser,
  } = useFetch();
  const { user: localUser, initialized: localUserInitialized } = useAuthContext();
  const { userFlights, dispatch } = useProfileContext();

  useEffect(() => {
    if (localUserInitialized) {
      if (localUser) {
        getRequestedUser({
          url: getGetUserUrl(requestedUserId),
          errorParser: getUserErrorParser,
          extraHeaders: { ...getAuthHeader(localUser.token) },
        });
      } else {
        navigate(getLoginPath());
      }
    }
  }, [localUserInitialized, localUser, getRequestedUser, requestedUserId, navigate]);

  useEffect(() => {
    if (userError === INAUTHED_ERROR) {
      navigate(getLoginPath());
    }
  }, [userError, navigate]);

  useEffect(() => {
    if (userData) {
      dispatch({ type: SET_USER_FLIGHTS, payload: userData.flights });
    }
  }, [userData, dispatch]);

  return (
    <>
      {userLoading && <div className={styles.getUserMessage}>{getLoadingMessage()}</div>}
      {userError && userError !== INAUTHED_ERROR && (
        <div className={styles.getUserMessage}>{userError}</div>
      )}
      {userData && (
        <div className={styles.profilePageContainer}>
          <p>
            <strong>Active User:</strong>&nbsp;
            <>{userData.firstName}</>&nbsp;
            <>{userData.lastName}</>
          </p>
          {userFlights && <SavedFlights flights={userFlights} />}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
