import axios from "axios";
import {BASE_URL_R} from "./helper.service";
import { getToken } from "../auth/HelperAuth";

export const publicAxios=axios.create({
    baseURL:BASE_URL_R
});

export const privateAxios=axios.create({
    baseURL:BASE_URL_R
});

privateAxios.interceptors.request.use(config=>{

    //Modification in request
    const token = getToken();
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }

    return config;
}, error => Promise.reject(error));
