import {privateAxios} from "./axios.services";

//add category
export const addCategory=async (category)=>{
    const response = await privateAxios.post(`/categories`, category);
    return response.data;
}

//get All Category
export const getCategories=async (currentPage=0)=>{
    const response = await privateAxios.get(`/categories?pageNumber=${currentPage}&&pageSize=6`);
    return response.data;
}

//delete category
export const deleteCategory=async (categoryId)=>{
    const response = await privateAxios.delete(`/categories/${categoryId}`);
    return response.data;
}

// update Category
export const updateCategory=async (category)=>{
    const response = await privateAxios.put(`/categories/${category.categoryId}`, category);
    return response.data;
}