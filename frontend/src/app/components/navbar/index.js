import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getHomePath } from '../../../config/pages/selectors';
import { getSiteLogoAlt, getSiteName } from '../../../config/theme/selectors';
import siteLogo from '../../../assets/get-your-way-logo.png';
import ProfileLinks from './profile-links';
import styles from './index.module.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleGoHome = useCallback(() => {
    navigate(getHomePath());
  }, [navigate]);

  return (
    <div className={styles.navBar}>
      <span onClick={handleGoHome} className={styles.navHeadline}>
        <h1 className={styles.navTitle}>{getSiteName()}</h1>
        <img className={styles.navLogo} src={siteLogo} alt={getSiteLogoAlt()} />
      </span>
      <ProfileLinks />
    </div>
  );
};

export default NavBar;
