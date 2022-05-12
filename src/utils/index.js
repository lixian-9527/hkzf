import { getAreaInfo } from '../apis/area'

// 获取当前地区位置
export const getCurrentCity = () => {
    // 判断localStorage是否有城市定位
    const localCity = JSON.parse(localStorage.getItem('hkzf_city'));
    if(!(localCity && Object.keys(localCity).length > 0)) {
        return new Promise((resolve, reject) => {
            // 通过BMap的IP定位获取当前城市
            const curCity = new window.BMapGL.LocalCity();
            curCity.get(async res => {
                try {
                    // 当前项目城市信息
                    const result = await getAreaInfo({name: res.name});
                    console.log(result.data.body);
                    
                    // 存储到本地缓存中
                    localStorage.setItem('hkzf_city', JSON.stringify(result.data.body));
                    
                    // 返回当前城市
                    resolve(result.data.body);
                } catch(e) {
                    reject(e);
                }
            })
        })        
    } else {
        return Promise.resolve(localCity);
    }
}