import { useNavigate } from 'react-router-dom';
import { getLoginPath, getProfilePath, getSignupPath } from '../../../../config/pages/selectors';

import styles from './index.module.css';

// temp for testing:
// const user = null;
const user = {
  id: 1,
};

const ProfileLinks = () => {
  const navigate = useNavigate();

  return (
    <span>
      {user ? (
        <button onClick={() => navigate(getProfilePath(user.id))} className={styles.authButton}>
          Your Profile
        </button>
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
