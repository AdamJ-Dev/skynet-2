import styles from './index.module.css';

const Toggler = ({ option1, option2, activeOption, setActiveOption }) => {
  return (
    <div className={styles.toggleContainer}>
      <div
        className={`${styles.oval} ${option1 === activeOption && styles.active}`}
        onClick={() => setActiveOption(option1)}
      >
        {option1}
      </div>
      <div
        className={`${styles.oval} ${option2 === activeOption && styles.active}`}
        onClick={() => setActiveOption(option2)}
      >
        {option2}
      </div>
    </div>
  );
};

export default Toggler;
