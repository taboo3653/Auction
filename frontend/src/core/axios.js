import axios from "axios";


const instance = axios.create();

instance.defaults.baseURL = window.location.origin;
instance.defaults.headers.common["Authorization"] = "Bearer " + window.localStorage.token;

instance.interceptors.response.use(function (response) {
    const date = new Date(response.headers.date);
    
    if(!window.diffTime)
        window.diffTime = (new Date()) - date;
    
        return response;
  });

window.axios = instance;

export default instance;