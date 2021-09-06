import React from 'react';
import styles from './not-found.module.css';

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className='h2 text-center'>404. Page Not Found</p>
    </div>
  );
}

export default NotFound;
