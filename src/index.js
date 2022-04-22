import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 导入全局样式
import './index.scss';

// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
