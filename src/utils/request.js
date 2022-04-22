// 引入axios
import axios from 'axios';

/**
  * 请求失败后的错误统一处理
  * @param {Number} status 请求失败的状态码
  */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
      // 401: 未登录状态，跳转登录页
      case 401:
        break;
      // 403 token过期
      // 清除token并跳转登录页
      case 403:
  
        break;
      // 404请求不存在
      case 404:
        break;
      default:
        console.error(other);
    }
};

// 创建axios实例
const instance = axios.create({
    timeout: 1000 * 12,
    baseURL: 'http://localhost:8080'
});

// 设置请求头参数
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers['Accept-Language'] = 'zh-CN';

/**
  * 请求拦截器
  * 每次请求前，如果存在token则在请求头中携带token
  */
instance.interceptors.request.use(
    (config) => ({ ...config }),
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // const { token } = 'xx';
    // token && (config.headers.Authorization = token);
  
    (error) => Promise.error(error),
);

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
    // 请求失败
    (error) => {
      const { response } = error;
      if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response.data.message);
        return Promise.reject(response);
      }
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        //   store.commit('changeNetwork', false);
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
);

export default instance;
