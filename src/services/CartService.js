import { privateAxios } from "../services/axios.services";

//Get Cart
export const getCart = async (userId) => {
  const response = await privateAxios.get(`/carts/${userId}`);
  return response.data;
};

//Add item to cart
export const addItemtoCart = async (userId, productId, quantity) => {
  const response = await privateAxios.post(`/carts/${userId}`, {
    productId,
    quantity,
  });
  return response.data;
};

//Clear Cart
export const clearCart = async (userId) => {
  const respone = await privateAxios.delete(`/carts/${userId}`);
  return respone.data;
};

//remove item from the Cart
export const removeItemsFromCart = async (userId, itemId) => {
  const res = await privateAxios.delete(`/carts/${userId}/items/${itemId}`);
  return res.data;
};
