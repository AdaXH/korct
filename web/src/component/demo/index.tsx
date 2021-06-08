import React, { memo, useCallback, useState } from 'react';
import { queryUser } from './service';

import styles from './styles.less';

export default memo(() => {
  const [value, setVal] = useState<string>('');
  const getApi = useCallback(async () => {
    const data = await queryUser(Date.now().toString());
    setVal(JSON.stringify(data, null, 2));
  }, []);
  return (
    <div className={styles.demo}>
      <div className={styles.get}>
        <button onClick={getApi}>GET /api/user/userId</button>
        <textarea readOnly value={value} />
      </div>
    </div>
  );
});
