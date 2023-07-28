import { getProgrammePath } from '../../../config/pages/selectors';
import Epg from './epg';

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Epg />
    </>
  );
};

export default HomePage;
