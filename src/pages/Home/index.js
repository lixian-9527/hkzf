import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile'
import { useEffect, useState } from 'react';

// 导入组建自己的样式文件
import './index.scss';

function Home() {
    // v6路由编程式导航对象
    const navigate = useNavigate();

    // location对象
    const location = useLocation();

    // 被激活的activeKey
    const [activeKey, setActiveKey] = useState('');

    // 导航栏数据
    const tabs = [
        {
          key: '', // tableBar的组件
          title: '首页', // tableBar的标题
          icon: (<i className='iconfont icon-ind'/>), // tableBar的图标
        },
        {
          key: 'houseList',
          title: '找房',
          icon: (<i className='iconfont icon-findHouse'/>),
        },
        {
          key: 'news',
          title: '资讯',
          icon: (<i className='iconfont icon-infom'/>),
        },
        {
          key: 'profile',
          title: '我的',
          icon: (<i className='iconfont icon-my'/>),
        },
    ]

    useEffect(() => {
        const getActiveKey = () => {
            let active = '' 
            if(location.pathname) {
                const nameList = location.pathname.split('/');
                active = nameList[nameList.length - 1];
                if (active === 'home') {
                    active = '';
                }
            }
            setActiveKey(active)
        }
        getActiveKey()
    },[location.pathname])

    // 路由导航方法
    const setRouteActive = (value) => {
        navigate(value);
    }
    
    return(
        <div className='app'>
            <div>
                <Outlet/>
            </div>
            <div className='bottom'>
                <TabBar activeKey={activeKey} onChange={setRouteActive}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Home;
