import { useEffect, useState } from 'react';
import { getSignupApiUrl } from '../../../config/api/selectors';
import { getLoginPath, getProfilePath } from '../../../config/pages/selectors';
import {
  getConfirmPasswordErrorMessage,
  getLoadingMessage,
  getSignupErrorMessage,
} from '../../../config/messages/selectors';
import useFetch from '../../hooks/useFetch';
import { useAuthContext } from '../../context/auth/hook';
import { useNavigate } from 'react-router';
import { setUserCookie } from '../../utility/user/userCookie';
import { LOGIN } from '../../context/auth/provider';
import { Link } from 'react-router-dom';

import styles from '../../styles/auth.module.css';
import { signupErrorParser } from '../../utility/error-handling/signupErrorParser';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [shouldIndicateError, setShouldIndicateError] = useState(false);
  const { loading: signupLoading, data: userData, error: signupError, post } = useFetch(getSignupApiUrl());
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
    if (signupError) {
      setShouldIndicateError(true);
    }
  }, [signupError]);

  useEffect(() => {
    setShouldIndicateError(false);
    setConfirmPasswordError(null);
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError(getConfirmPasswordErrorMessage());
      setShouldIndicateError(true);
    } else {
      await post({ firstName, lastName, email, password }, { errorParser: signupErrorParser });
    }
  };

  return (
    <div className={styles.authPageContainer}>
      <h1>Sign up</h1>
      <div className={`${styles.formContainer} ${shouldIndicateError && styles.errorBorder}`}>
        <form onSubmit={handleSignup}>
          <div className={styles.formGroup}>
            <label htmlFor="first-name">First Name:</label>
            <input
              className={styles.formInput}
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="last-name">Last Name:</label>
            <input
              className={styles.formInput}
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <div className={styles.formGroup}>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              className={styles.formInput}
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.formButton} type="submit">
            {signupLoading ? getLoadingMessage() : 'Sign Up'}
          </button>
        </form>
      </div>
      {shouldIndicateError && <div className={styles.error}>{confirmPasswordError || signupError}</div>}
      <p>
        Already registered? <Link to={getLoginPath()}>Log in</Link>
      </p>
    </div>
  );
};

export default SignupPage;
