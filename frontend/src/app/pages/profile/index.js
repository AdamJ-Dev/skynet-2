import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGetUserUrl } from '../../../config/api/selectors';
import { getLoginPath } from '../../../config/pages/selectors';
import { INAUTHED_ERROR, getUserErrorParser } from '../../utility/error-handling/getUserErrorParser';
import { getLoadingMessage } from '../../../config/messages/selectors';
import { getAuthHeader } from '../../utility/user/authRequest';
import { SET_USER_FLIGHTS } from '../../context/profile/provider';
import { useProfileContext } from '../../context/profile/hook';
import { useAuthContext } from '../../context/auth/hook';
import useFetch from '../../hooks/useFetch';
import styles from './index.module.css';
import SavedFlights from './saved-flights';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id: requestedUserId } = useParams();
  const { loading: userLoading, data: userData, error: userError, get: getRequestedUser } = useFetch();
  const { user: localUser, initialized: localUserInitialized } = useAuthContext();
  const { userFlights, dispatch } = useProfileContext();

  useEffect(() => {
    if (localUserInitialized && localUser) {
      getRequestedUser({
        url: getGetUserUrl(requestedUserId),
        errorParser: getUserErrorParser,
        extraHeaders: { ...getAuthHeader(localUser.token) },
      });
    } else {
      getRequestedUser({ url: getGetUserUrl(requestedUserId), errorParser: getUserErrorParser });
    }
  }, [localUserInitialized, localUser]);

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
      {userLoading && <div className={styles.getUserMessage}>{getLoadingMessage()}</div>}
      {userError && userError !== INAUTHED_ERROR && <div className={styles.getUserMessage}>{userError}</div>}
      {userData && (
        <div className={styles.profilePageContainer}>
          <p>
            <strong>Active User:</strong>&nbsp;
            <>{userData.firstName}</>&nbsp;
            <>{userData.lastName}</>
          </p>
          <p>
            <strong>Your saved flights:</strong>
          </p>
          {userFlights && <SavedFlights />}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
