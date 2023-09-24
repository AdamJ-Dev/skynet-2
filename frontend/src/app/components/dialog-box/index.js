import styles from './index.module.css';

const DialogBox = ({ content, closer }) => {
  return (
    <div>
      <div className={styles.dialogOverlay} />
      <div className={styles.dialogContent}>
        {content}
        <button className={styles.closeButton} onClick={closer}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
