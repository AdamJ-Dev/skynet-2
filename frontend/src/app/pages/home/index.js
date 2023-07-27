import { getProgrammePath } from '../../../config/pages/selectors';

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <a href={getProgrammePath(1)}>Click on me to see a programme</a>
    </>
  );
};

export default HomePage;
