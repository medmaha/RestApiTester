import axios from "axios"

const axiosInstance = axios.create({
    headers: {},
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
)

export default axiosInstance
