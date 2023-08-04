import { Link, useNavigate } from 'react-router-dom';
import { getProfilePath, getSignupPath } from '../../../config/pages/selectors';
import useFetch from '../../hooks/useFetch';
import { getLoginApiUrl } from '../../../config/api/selectors';
import { useEffect, useState } from 'react';
import { getLoadingMessage, getLoginErrorMessage } from '../../../config/messages/selectors';
import { setUserCookie } from '../../utility/user/userCookie';
import { useAuthContext } from '../../context/auth/hook';
import { LOGIN } from '../../context/auth/provider';

import styles from '../../styles/auth.module.css';
import { loginErrorParser } from '../../utility/error-handling/loginErrorParser';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldIndicateError, setShouldIndicateError] = useState(false);
  const { loading: loginLoading, data: userData, error: loginError, post } = useFetch(getLoginApiUrl());
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUserCookie(userData);
      dispatch({ type: LOGIN, payload: userData });
      navigate(getProfilePath(userData.id));
    }
  }, [userData]);

  useEffect(() => {
    if (loginError) {
      setShouldIndicateError(true);
    }
  }, [loginError]);

  useEffect(() => {
    setShouldIndicateError(false);
  }, [email, password]);

  const handleAuthenticate = async (e) => {
    e.preventDefault();
    await post({ email, password }, { errorParser: loginErrorParser } );
  };

  return (
    <div className={styles.authPageContainer}>
      <h1>Log in</h1>
      <div className={`${styles.formContainer} ${shouldIndicateError && styles.errorBorder}`}>
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
      {shouldIndicateError && <div className={styles.error}>{loginError}</div>}
      <p>
        Haven't registered yet? <Link to={getSignupPath()}>Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
