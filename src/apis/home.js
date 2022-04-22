import request from './../utils/request'

/**
 * 查询轮播图片列表
 */
export function getSwipersList() {
    return request({
        url: '/home/swiper',
        method: 'GET'
    })
}

/**
 * 获取租房小组数据的方法
 * parems= {area: 'AREA|88cff55c-aaa4-e2e0'} area:地区ID
 */
 export function getGroupsList(parems) {
    return request({
        url: '/home/groups',
        method: 'GET',
        params: parems
    })
}

/**
 * 获取最新资讯的方法
 * parems= {area: 'AREA|88cff55c-aaa4-e2e0'} area:地区ID
 */
 export function getNewsList(parems) {
    return request({
        url: '/home/news',
        method: 'GET',
        params: parems
    })
}
