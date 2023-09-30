import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSignupApiUrl } from '../../../config/api/selectors';
import { getLoginPath, getProfilePath } from '../../../config/pages/selectors';
import {
  getConfirmPasswordErrorMessage,
  getLoadingMessage,
} from '../../../config/messages/selectors';
import { gatherClasses, optionalClass } from '../../../lib/web/cssClasses';
import { signupErrorParser } from '../../utility/error-handling/signupErrorParser';
import { setUserCookie } from '../../utility/user/userCookie';
import { LOGIN } from '../../context/auth/provider';
import { useAuthContext } from '../../context/auth/hook';
import useFetch from '../../hooks/useFetch';
import styles from '../../styles/auth.module.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    loading: signupLoading,
    data: userData,
    error: signupError,
    post: signup,
  } = useFetch(getSignupApiUrl());
  const { dispatch } = useAuthContext();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError(getConfirmPasswordErrorMessage());
      setShowError(true);
    } else {
      const user = { firstName, lastName, email, password };
      await signup(user, { errorParser: signupErrorParser });
    }
  };

  useEffect(() => {
    if (userData) {
      setUserCookie(userData);
      dispatch({ type: LOGIN, payload: userData });
      navigate(getProfilePath(userData.id));
    }
  }, [userData]);

  useEffect(() => {
    if (signupError) {
      setShowError(true);
    }
  }, [signupError]);

  useEffect(() => {
    setShowError(false);
    setConfirmPasswordError(null);
  }, [firstName, lastName, email, password, confirmPassword]);

  return (
    <div className={styles.authPageContainer}>
      <h1>Sign up</h1>
      <div
        className={gatherClasses(
          styles.formContainer,
          optionalClass(styles.errorBorder, showError)
        )}
      >
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
      {showError && (
        <div className={styles.error}>{confirmPasswordError || signupError}</div>
      )}
      <p>
        Already registered? <Link to={getLoginPath()}>Log in</Link>
      </p>
    </div>
  );
};

export default SignupPage;
