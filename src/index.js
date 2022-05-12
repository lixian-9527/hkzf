import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入全局样式
import './index.scss';

// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'

// 应该将组件的导入放在样式的导入的后面，从而避免全局样式覆盖问题
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);
