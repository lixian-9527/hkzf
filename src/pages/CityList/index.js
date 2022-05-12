import { NavBar, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { getCityList, getHotCityList } from '../../apis/area'
import { getCurrentCity } from '../../utils/index'
import { List, AutoSizer } from 'react-virtualized'
import './index.scss'

// 索引 A,B等高度
const TITLE_HEIGHT = 39

// 每个城市的高度
const NAME_HEIGHT = 50

// 有房源数据的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

// 标题格式
const formatTitle = (title) => {
    switch (title) {
        case '#':
            return '当前定位'
        case 'hot':
            return '热门城市'
        default:
            return title.toUpperCase();
    }

}

function CityList() {

    // v6路由编程式导航对象
    const navigate = useNavigate();

    // 城市列表数据
    // {a: [], b: [], c: []}
    const [cityList, setCityList] = useState({});

    // 列表右侧索引数据
    // [a, b, c]
    const [cityListIndex, setCityListIndex] = useState([])

    // 右侧索引激活下标
    const [activeIndex, setActiveIndex] = useState(0);

    // 创建ref用于获取List组件的DOM节点
    const listDom = useRef();

    // 组件首次加载
    useEffect(() => {
        // 调用接口获取城市数据
        const getCityData = async () => {
            // 获取城市列表数据
            const result = await getCityList({ level: 1 });

            // 格式化城市列表信息
            const { fCityList, fCityListIndex } = formatCityData(result.data.body);

            // 获取热门
            const hotResult = await getHotCityList();
            fCityList['hot'] = hotResult.data.body;
            fCityListIndex.unshift('hot')

            // 获取当前位置
            const currentCity = await getCurrentCity();
            fCityList['#'] = [currentCity];
            fCityListIndex.unshift('#')

            setCityList(fCityList);
            setCityListIndex(fCityListIndex)
        }
        getCityData();
    }, [])

    useEffect(() => {
        if (cityListIndex.length > 0) {
            // 调用measureAllRows方法提前计算List中每一行高度，实现scrollToRow精准跳转
            listDom.current.measureAllRows();
        }
    }, [cityListIndex])


    // 格式化城市数据
    const formatCityData = (list) => {
        // 格式化后的城市列表数据
        const fCityList = {};

        // 遍历list数组
        list.forEach(item => {
            const fistName = item.short?.substr(0, 1);
            // 判断cityList是否有该下标对象
            if (fCityList[fistName]) {
                // 如果有则将该item加入该下标对象中
                fCityList[fistName].push(item);
            } else {
                // 如果没有则首次添加
                fCityList[fistName] = [item];
            }
        });
        // 格式化后的城市下标数据
        const fCityListIndex = Object.keys(fCityList).sort();
        return {
            fCityList,
            fCityListIndex
        }
    }

    // 城市列表每一行渲染
    const rowRenderer = ({
        key,            // 唯一值
        index,          // 索引号
        isScrolling,    // 是否在滚动中
        isVisible,      // 当前行在list中是否可见
        style,          // 每行的样式对象
    }) => {
        // 获取当前下表索引
        const curIndex = cityListIndex[index];

        // 获取当前索引的地址信息
        const curCityList = cityList[curIndex];

        return (
            <div key={key} style={style} className='city-item'>
                <div className='title'>{formatTitle(curIndex)}</div>
                {
                    curCityList.map(item => (
                        <div key={item.value} className='name' onClick={() => changeCity(item)}>{item.label}</div>
                    ))
                }

            </div>
        )
    };

    // 当前城市切换
    const changeCity = ({ label, value }) => {
        if (HOUSE_CITY.includes(label)) {
            localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
            navigate('/');
        } else {
            Toast.show({
                content: '该城市暂无房源数据！'
            })
        }
    }

    // 点击右侧索引跳转对应房屋列表
    const indexClick = (index) => {
        // 获取List节点DOM
        const listCompnent = listDom.current;
        // 跳转指定位置
        listCompnent.scrollToRow(index);
        // 点击位置设置高亮
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    }

    // 封装渲染右侧索引结构
    const renderCityIndex = () => {
        return cityListIndex.map((item, index) => (
            <li key={item} className='city-index-item' onClick={() => indexClick(index)}>
                <span className={activeIndex === index ? 'active-index' : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
            </li>
        ))
    }

    // 每一行城市高度计算
    const getRowHeight = ({ index }) => {
        // 
        return TITLE_HEIGHT + cityList[cityListIndex[index]].length * NAME_HEIGHT;
    }

    // 用于获取List组件中渲染行的信息
    const onRowsRendered = ({ startIndex }) => {
        // 如果当前渲染下表与激活下表不一致才重新设置激活下标,避免重新渲染，造成性能消耗
        if (activeIndex !== startIndex) {
            setActiveIndex(startIndex);
        }
    }

    return (
        <div className='city'>
            {/** 头部导航栏 */}
            <NavBar onBack={() => navigate(-1)}>城市选择</NavBar>

            {/** 城市列表模块 */}
            <AutoSizer>
                {
                    ({ height, width }) => (
                        <List
                            ref={listDom}
                            width={width}
                            height={height}
                            rowCount={cityListIndex.length}
                            onRowsRendered={onRowsRendered}
                            rowHeight={getRowHeight}
                            scrollToAlignment='start'
                            rowRenderer={rowRenderer} />
                    )
                }
            </AutoSizer>

            {/** 头部导航栏 */}
            <ul className='city-index'>
                {renderCityIndex()}
            </ul>
        </div>
    )
}

export default CityList;
