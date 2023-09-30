import { choiceClass } from '../../../lib/web/cssClasses';
import styles from './index.module.css';

const LoadingText = ({ text, vibrant }) => {
  return (
    <span className={choiceClass(styles.vibrantLoadingText, styles.dullLoadingText, vibrant)}>
      {text.split('').map((letter, index) => (
        <span style={{ animationDelay: `${index / 10}s` }}>{letter}</span>
      ))}
    </span>
  );
};

export default LoadingText;
