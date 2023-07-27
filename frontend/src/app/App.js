import { Routes, Route } from 'react-router-dom';
import {
  getHomePath,
  getLoginPath,
  getProfileBasePath,
  getProgrammeBasePath,
  getSignupPath,
} from '../config/pages/selectors';
import HomePage from './pages/home';
import NavBar from './components/navbar';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ProfilePage from './pages/profile';
import ProgrammePage from './pages/programme';

function App() {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path={getHomePath()} element={<HomePage />} />
          <Route path={getLoginPath()} element={<LoginPage />} />
          <Route path={getSignupPath()} element={<SignupPage />} />
          <Route path={`${getProfileBasePath()}/:id`} element={<ProfilePage />} />
          <Route path={`${getProgrammeBasePath()}/:id`} element={<ProgrammePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
