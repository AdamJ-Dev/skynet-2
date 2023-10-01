import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
  getHomePath,
  getLoginPath,
  getProfilePath,
  getSignupPath,
} from '../../../../config/pages/selectors';
import { useAuthContext } from '../../../context/auth/hook';
import { deleteUserCookie } from '../../../utility/user/userCookie';
import { LOGOUT } from '../../../context/auth/provider';
import styles from './index.module.css';

const ProfileLinks = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const handleGoToProfile = useCallback(() => {
    navigate(getProfilePath(user.id));
  }, [user, navigate]);

  const handleLogout = useCallback(() => {
    deleteUserCookie();
    dispatch({ type: LOGOUT });
    navigate(getHomePath());
  }, [dispatch, navigate]);

  const handleGoToSignup = useCallback(() => {
    navigate(getSignupPath());
  }, [navigate]);

  const handleGoToLogin = useCallback(() => {
    navigate(getLoginPath());
  }, [navigate]);

  return (
    <span>
      {user ? (
        <>
          <button onClick={handleGoToProfile} className={styles.authButton}>
            Profile
          </button>
          &nbsp;
          <button onClick={handleLogout} className={styles.authButton}>
            Log out
          </button>
        </>
      ) : (
        <>
          <button onClick={handleGoToSignup} className={styles.authButton}>
            Sign up
          </button>
          &nbsp;
          <button onClick={handleGoToLogin} className={styles.authButton}>
            Log in
          </button>
        </>
      )}
    </span>
  );
};

export default ProfileLinks;
