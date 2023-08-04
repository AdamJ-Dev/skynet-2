import { getPostUserFlightUrl } from '../../../../config/api/selectors';
import { getGenericErrorMessage, getLoadingMessage } from '../../../../config/messages/selectors';
import { useAuthContext } from '../../../context/auth/hook';
import useFetch from '../../../hooks/useFetch';

import styles from './index.module.css';

const SaveFlightButton = ({ flight }) => {
  const { user } = useAuthContext();
  const { loading: saveLoading, data: saveData, error: saveError, post: saveFlight } = useFetch('');

  const handleSaveFlight = () => {
    saveFlight(flight, {
      url: getPostUserFlightUrl(user.id),
      extraHeaders: { Authorization: `Bearer ${user.token}` },
    });
  };

  if (saveLoading) return getLoadingMessage();
  if (saveError) return saveError;
  if (saveData) return 'Saved.';

  return <button className={styles.saveBtn} onClick={() => handleSaveFlight()}>+</button>;
};

export default SaveFlightButton;
