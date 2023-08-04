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

import styles from './App.module.css';
import { AuthContextProvider } from './context/auth/provider';
import { ProfileContextProvider } from './context/profile/provider';
import NotFoundPage from './pages/404';

function App() {
  return (
    <AuthContextProvider>
      <NavBar />
      <div className={styles.pageContainer}>
        <Routes>
          <Route path={getHomePath()} element={<HomePage />} />
          <Route path={getLoginPath()} element={<LoginPage />} />
          <Route path={getSignupPath()} element={<SignupPage />} />
          <Route
            path={`${getProfileBasePath()}/:id`}
            element={
              <ProfileContextProvider>
                <ProfilePage />
              </ProfileContextProvider>
            }
          />
          <Route path={`${getProgrammeBasePath()}/:id`} element={<ProgrammePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
