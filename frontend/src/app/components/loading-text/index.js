import { choiceClass } from '../../../lib/web/cssClasses';
import styles from './index.module.css';

const LoadingText = ({ text, isVibrant }) => {
  return (
    <span
      className={choiceClass(
        styles.vibrantLoadingText,
        styles.dullLoadingText,
        isVibrant
      )}
    >
      {text.split('').map((letter, index) => (
        <span style={{ animationDelay: `${index / 10}s` }} key={index}>
          {letter}
        </span>
      ))}
    </span>
  );
};

export default LoadingText;
