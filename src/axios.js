import axios from 'axios';
const BASE_URL = "http://173.249.60.28:60772/api";
const axiosInstance = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
        common: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFobGFsbGFoLmNvbSIsImdlbmRlciI6Im1hbGUiLCJqdGkiOiIzODE0Y2FjMS1iMjZjLTQ2OTYtYmRiMi04MzBiMzNiYmM3NTgiLCJleHAiOjE3MTMwMzkxMzgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjA3NzIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.iFUI2YF721YM0lCmtB96W7ed5vnggFq6GqvcftCC-tw'
        }
    },
    baseURL: BASE_URL
});

// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
// axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    // console.log(response);
    // Edit response config
    if (response.data) return response.data
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default axiosInstance;

