import axios from "axios"

const requests = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 5000
});
//请求拦截器
requests.interceptors.request.use((config) => {
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    return res;
}, () => {
    return Promise.reject(new Error("failure"));
})
export default requests;