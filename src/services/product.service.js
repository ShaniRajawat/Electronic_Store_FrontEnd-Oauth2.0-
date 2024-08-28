import {privateAxios} from "./axios.services";

export const addCategory=async (category)=>{
    const response = await privateAxios.post(`/categories`, category);
    return response.data;
}