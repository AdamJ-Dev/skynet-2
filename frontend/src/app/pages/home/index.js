import { getHomeContentDescription, getHomeContentHeadline } from '../../../config/pages/selectors';
import { EpgContextProvider } from '../../context/epg/provider';
import Epg from './epg';
import styles from './index.module.css';

const HomePage = () => {
  return (
    <>
      <h1 className={styles.homeHeadline}>{getHomeContentHeadline()}</h1>
      <p>{getHomeContentDescription()}</p>
      <EpgContextProvider>
        <Epg />
      </EpgContextProvider>
    </>
  );
};

export default HomePage;
