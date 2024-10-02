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

//create orders of users
export const createOrder=async(orderDetail)=>{
    const result =await privateAxios.post(`/order`,orderDetail);
    return result.data;
}

//get order of users
export const getAllOrdersOfUser=async(userId)=>{
    const result = await privateAxios.get(`/order/users/${userId}`);
    return result.data;
}