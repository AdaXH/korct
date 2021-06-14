import React, { memo } from 'react';

import styles from './styles.less';

export default memo(() => (
  <div className={styles.logo}>
    <h1>Hello. </h1>
    <span>Korct</span>
  </div>
));
