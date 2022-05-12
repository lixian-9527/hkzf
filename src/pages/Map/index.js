import { useEffect } from 'react';
import './index.scss'


function Map() {
    useEffect(() => {
        // 创建地图实例 
        const map = new window.BMapGL.Map("container");
        const content = 'label';
        // 创建点坐标 
        const point = new window.BMapGL.Point(116.404, 39.915);
        const label = new window.BMapGL.Label(content, {       // 创建文本标注
            position: point,
            offset: new window.BMapGL.Size(10, 20)
        })
        label.setContent(`
            <div>
                <p>无锡</p>
                <p>20套</p>
            </div>
        `)
        label.setStyle({                              // 设置label的样式
            color: '#000',
            fontSize: '30px',
            border: '1px solid #1E90FF'
        })
        map.addOverlay(label); 
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 15);
        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true);
    }, [])
    return (
        <div className='map'>
            {/** 地图容器 */}
            <div id='container'>
            </div>
        </div>
    )
}

export default Map;
