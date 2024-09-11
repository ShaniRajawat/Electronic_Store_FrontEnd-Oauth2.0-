import { privateAxios } from "./axios.services";


//All the function calling api realted to order

//get Orders
export const getAllOrders=async (pageNumber, pageSize, sortBy, sortDir)=>{
    const res = await privateAxios.get(`/order?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
    return res.data;
}

//update orders
export const updateOrder=async (order, orderId)=>{
    const result = await privateAxios.put(`/order/${orderId}`,order);
    return result.data;
}

//get order pf users