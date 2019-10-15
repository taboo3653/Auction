import axios from "axios";

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.token;

axios.interceptors.response.use(function (response) {
    const date = new Date(response.headers.date);
    
    if(!window.diffTime)
        window.diffTime = (new Date()) - date;
    
        return response;
  });

window.axios = axios;

export default axios;