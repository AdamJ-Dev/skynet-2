import styles from './index.module.css';

const DialogBox = ({ content, isOpen, setIsOpen }) => {
  return (
    <div>
      {isOpen && (
        <>
          <div className={styles.dialogOverlay} />
          <div className={styles.dialogContent}>
            {content}
          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default DialogBox;
