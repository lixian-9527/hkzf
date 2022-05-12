import request from './../utils/request'

/**
 * 根据城市名称查询该城市信息
 * parems = {name : '北京'} name为地区名称
 */
 export function getAreaInfo(params) {
    return request({
        url: '/area/info',
        method: 'GET',
        params: params
    })
}

/**
 * 根据城市名称查询该城市信息
 * parems = {level  : 1} 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据
 */
export function getCityList(params) {
    return request({
        url: '/area/city',
        method: 'GET',
        params: params
    })
}

/**
 * 获取热门城市
 * parems = {level  : 1} 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据
 */
 export function getHotCityList() {
    return request({
        url: '/area/hot',
        method: 'GET'
    })
}
