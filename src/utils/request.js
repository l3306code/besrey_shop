import axios from 'axios'

const service = axios.create({
  baseURL: '/jaalon', 
  timeout: 10000
})

//请求拦截器
service.interceptors.request.use(
  config =>{
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }
)

export default service