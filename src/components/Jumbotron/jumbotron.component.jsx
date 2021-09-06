import styles from './jumbotron.module.css';

function Jumbotron({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Jumbotron;
