import { useNavigate } from "react-router-dom";
import {
  getLoginPath,
  getProfilePath,
  getSignupPath,
} from "../../../../config/pages/selectors";

import styles from "./index.module.css";

// temp for testing:
const user = null;
// const user = {
//   id: 1,
//   username: "adam",
// };

const ProfileLinks = () => {
  const navigate = useNavigate();

  return (
    <span>
      {user ? (
        <span
          onClick={() => navigate(getProfilePath(user.id))}
          className={styles.initialsIcon}
        >
          <span>{user.username.charAt(0).toUpperCase()}</span>
        </span>
      ) : (
        <>
          <button
            onClick={() => navigate(getSignupPath())}
            className={styles.authButton}
          >
            Sign up
          </button>
          <button
            onClick={() => navigate(getLoginPath())}
            className={styles.authButton}
          >
            Log in
          </button>
        </>
      )}
    </span>
  );
};

export default ProfileLinks;
