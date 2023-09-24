import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProfilePath, getSignupPath } from '../../../config/pages/selectors';
import { getLoginApiUrl } from '../../../config/api/selectors';
import { getLoadingMessage } from '../../../config/messages/selectors';
import { gatherClasses, optionalClass } from '../../../lib/web/cssClasses';
import { setUserCookie } from '../../utility/user/userCookie';
import { loginErrorParser } from '../../utility/error-handling/loginErrorParser';
import { LOGIN } from '../../context/auth/provider';
import { useAuthContext } from '../../context/auth/hook';
import useFetch from '../../hooks/useFetch';
import styles from '../../styles/auth.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    loading: loginLoading,
    data: userData,
    error: loginError,
    post: login,
  } = useFetch(getLoginApiUrl());
  const { dispatch } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleAuthenticate = async (e) => {
    e.preventDefault();
    const user = { email, password };
    await login(user, { errorParser: loginErrorParser });
  };

  useEffect(() => {
    if (userData) {
      setUserCookie(userData);
      dispatch({ type: LOGIN, payload: userData });
      navigate(getProfilePath(userData.id));
    }
  }, [userData]);

  useEffect(() => {
    if (loginError) {
      setShowError(true);
    }
  }, [loginError]);

  useEffect(() => {
    setShowError(false);
  }, [email, password]);

  return (
    <div className={styles.authPageContainer}>
      <h1>Log in</h1>
      <div className={gatherClasses(styles.formContainer, optionalClass(styles.errorBorder, showError))}>
        <form onSubmit={handleAuthenticate}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              className={styles.formInput}
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              className={styles.formInput}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.formButton} type="submit">
            {loginLoading ? getLoadingMessage() : 'Log in'}
          </button>
        </form>
      </div>
      {showError && <div className={styles.error}>{loginError}</div>}
      <p>
        Haven't registered yet? <Link to={getSignupPath()}>Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
