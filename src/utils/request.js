import axios from 'axios'

const service = axios.create({
  baseURL: '/jaalon', 
  timeout: 10000
})

export default service