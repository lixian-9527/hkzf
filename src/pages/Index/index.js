import { Swiper } from 'antd-mobile'
import './index.scss'
import { useEffect, useState } from 'react'
import { getSwipersList, getGroupsList, getNewsList } from './../../apis/home'
import { useNavigate } from 'react-router-dom'

// 导航栏图片引入
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

function Index() {
    // v6路由编程式导航对象
    const navigate = useNavigate();

    // 轮播图片数据
    const [swipers, setSwipers] = useState([]);

    // 推荐房屋小组数据
    const [groups, setGroups] = useState([]);

    // 最新消息数据
    const [news, setNews] = useState([]);

    // 导航栏数据
    const navBarList = [
        {
            id: Math.random(),
            img: Nav1,
            title: '整租',
            path: 'houseList'
        },
        {
            id: Math.random(),
            img: Nav2,
            title: '合租'
        },
        {
            id: Math.random(),
            img: Nav3,
            title: '地图找房'
        },
        {
            id: Math.random(),
            img: Nav4,
            title: '去出租'
        }
    ]

    // 组件第一次被加载获取轮播图片数据
    useEffect(() => {
        getSwipers();
        getGroups();
        getNews();
    }, []) 

    // 调用接口获取轮播图片
    async function getSwipers() {
        const res = await getSwipersList();
        setSwipers(res.data.body);
    }

    // 调用接口获取推荐租房小组数据
    async function getGroups() {
        const res = await getGroupsList({area:'AREA%7C88cff55c-aaa4-e2e0'});
        setGroups(res.data.body)
    }

    // 调用接口获取最细资讯数据
    async function getNews() {
        const res = await getNewsList({area:'AREA%7C88cff55c-aaa4-e2e0'});
        setNews(res.data.body)
    }

    // 渲染轮播图结构
    function renderSwipers() {
        return swipers.map((item) => (
            <Swiper.Item key={item.id}>
                <a
                  href="###"
                  className='link'
                >
                    <img
                      src={`http://localhost:8080${item.imgSrc}`}
                      alt='图片加载失败'
                      className='link-img'
                    > 
                    </img>
                </a>
            </Swiper.Item>
        ))
    }

    // 导航栏结构渲染
    const rendNavBar = () => (
        navBarList.map(item => (
            <div key={item.id} className='nav-bar-item' onClick={() => navigate(item.path)}>
                <img src={item.img} alt=''></img>
                <h2>{item.title}</h2>
            </div>
        ))
    )

    // 宫格组件结构渲染
    const renGrid = () => (
        groups.map(item => (
            <div className='g-item' key={item.id}>
                <div className='g-title'>
                    <p>{item.title}</p>
                    <span>{item.desc}</span>
                </div>
                <div>
                    <img 
                        src={`http://localhost:8080${item.imgSrc}`}
                        alt=''
                    />
                </div>
            </div>
        ))
    )

    // 资讯组件结构渲染
    const rendNews = () => (
        news.map(item => (
            <div className='n-item' key={item.id}>
                <div className='item-left'>
                    <img
                        src={`http://localhost:8080${item.imgSrc}`}
                        alt=''
                    >
                    </img>
                </div>
                <div className='item-right'>
                    <h3 className='r-title'>{item.title}</h3>
                    <div className='r-bottom'>
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </div>
                </div>
            </div>
        ))
    )

    return (
        <div className='main'>
            {/* 顶部导航栏 */}
            <div className='top-bar'>

                {/* 左侧搜索区域 */}
                <div className='search'>

                    {/* 位置 */}
                    <div className='location' onClick={() => navigate('citylist')}>
                        <span>上海</span>
                        <i className='iconfont icon-arrow'></i>
                    </div>

                    {/* 搜索表单 */}
                    <div className='form' onClick={() => navigate('search')}>
                        <i className='iconfont icon-seach'></i>
                        <span>请输入小区地址</span>
                    </div>
                </div>

                {/* 右侧地图图标 */}
                <i className='iconfont icon-map' onClick={() => navigate('map')}></i>
            </div>

            {/* 轮播图 */}
            <Swiper autoplay loop>{renderSwipers()}</Swiper>

            {/* 导航栏 */}
            <div className='nav-bar'>{rendNavBar()}</div>

            {/* 推荐房屋信息 */}
            <div className='groups'>
                <h3 className='title'>
                    <span>租房小组</span><span className='more'>更多</span>
                </h3>

                {/* 宫格组件 */}
                <div className='grid'>{renGrid()}</div>
            </div>

            {/* 最新资讯 */}
            <div className='news'>
                <h3>最新资讯</h3>

                {/* 资讯组件 */}
                {rendNews()}
            </div>
        </div>
    )
}

export default Index;
