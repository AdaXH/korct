import React from 'react';
import ReactDom from 'react-dom';
import Logo from './component/logo';
import Demo from './component/demo';

import styles from './styles.less';
import './global.less';

const App: React.FC<any> = () => {
  return (
    <div className={styles.box}>
      <Logo />
      <Demo />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));
