import { useNavigate } from "react-router-dom";
import siteLogo from "../../../assets/get-your-way-logo.png"

import styles from "./index.module.css";
import ProfileLinks from "./profile-links";
import { getHomePath } from "../../../config/pages/selectors";



const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navBar}>
      <span onClick={() => navigate(getHomePath())} className={styles.navHeadline}>
          <h1 className={styles.navTitle}>GetYourWay</h1>
          <img className={styles.navLogo} src={siteLogo} alt="Get your way logo"/>
      </span>
      <ProfileLinks />
    </div>
  );
}
 
export default NavBar;