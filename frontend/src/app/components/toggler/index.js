import { useCallback } from 'react';
import { gatherClasses, optionalClass } from '../../../lib/web/cssClasses';
import styles from './index.module.css';

const Toggler = ({ option1, option2, activeOption, setActiveOption }) => {
  const handleClickOption1 = useCallback(() => {
    setActiveOption(option1);
  }, [option1, setActiveOption]);

  const handleClickOption2 = useCallback(() => {
    setActiveOption(option2);
  }, [option2, setActiveOption]);

  return (
    <div className={styles.toggleContainer}>
      <div
        className={gatherClasses(
          styles.oval,
          optionalClass(styles.active, option1 === activeOption)
        )}
        onClick={handleClickOption1}
      >
        {option1}
      </div>
      <div
        className={gatherClasses(
          styles.oval,
          optionalClass(styles.active, option2 === activeOption)
        )}
        onClick={handleClickOption2}
      >
        {option2}
      </div>
    </div>
  );
};

export default Toggler;
