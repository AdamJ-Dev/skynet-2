import { useNavigate } from 'react-router-dom';
import { getHomePath } from '../../../config/pages/selectors';
import { getSiteLogoAlt, getSiteName } from '../../../config/theme/selectors';
import siteLogo from '../../../assets/get-your-way-logo.png';
import ProfileLinks from './profile-links';
import styles from './index.module.css';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navBar}>
      <span onClick={() => navigate(getHomePath())} className={styles.navHeadline}>
        <h1 className={styles.navTitle}>{getSiteName()}</h1>
        <img className={styles.navLogo} src={siteLogo} alt={getSiteLogoAlt()} />
      </span>
      <ProfileLinks />
    </div>
  );
};

export default NavBar;
