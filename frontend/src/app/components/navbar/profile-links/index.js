import { useNavigate } from 'react-router-dom';
import { getHomePath, getLoginPath, getProfilePath, getSignupPath } from '../../../../config/pages/selectors';
import { useAuthContext } from '../../../context/auth/hook';
import { deleteUserCookie } from '../../../utility/user/userCookie';
import { LOGOUT } from '../../../context/auth/provider';

import styles from './index.module.css';

const ProfileLinks = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    deleteUserCookie();
    dispatch({ type: LOGOUT });
    navigate(getHomePath());
  };

  return (
    <span>
      {user ? (
        <>
        <button onClick={() => navigate(getProfilePath(user.id))} className={styles.authButton}>
          Profile
        </button>
        &nbsp;
         <button onClick={() => handleLogout()} className={styles.authButton}>
          Log out 
       </button>
       </>
      ) : (
        <>
          <button onClick={() => navigate(getSignupPath())} className={styles.authButton}>
            Sign up
          </button>
          &nbsp;
          <button onClick={() => navigate(getLoginPath())} className={styles.authButton}>
            Log in
          </button>
        </>
      )}
    </span>
  );
};

export default ProfileLinks;
