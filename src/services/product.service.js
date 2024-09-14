import { privateAxios } from "./axios.services";

export const createProductWithoutCategory = async (product) => {
  const response = await privateAxios.post(`/products`, product);
  return response.data;
};

export const createProductInCategory = async (product, categoryId) => {
  const response = await privateAxios.post(
    `/categories/${categoryId}/products`,
    product
  );
  return response.data;
};

export const addProductImage = async (file, productId) => {
  const formData = new FormData();
  formData.append("productImage", file);
  const response = await privateAxios.post(
    `/products/image/${productId}`,
    formData
  );
  return response.data;
};

export const getAllProducts = async (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "desc"
) => {
  const response = await privateAxios
    .get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  return response.data;
};

//get All Live Products
export const getAllLiveProducts = async (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "desc"
) => {
  const response = await privateAxios
    .get(
      `/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  return response.data;
};

//get Single Products
export const getSingleProduct = async (productId)=>{
  const response = await privateAxios.get(`/products/${productId}`);
  return response.data;
}

//delete Product
export const deleteProduct =async (productId)=>{
  const response = await privateAxios.delete(`/products/${productId}`);
  return response.data;
}

//Update Product
export const updateProduct =async (product, productId)=>{
  const response = await privateAxios.put(`/products/${productId}`, product);
  return response.data;
}

//Update Category of Product
export const updateProductCategory=async (categoryId, productId)=>{
  const response = await privateAxios.put(`/categories/${categoryId}/products/${productId}`);
  return response.data;
}

//Search Product service
export const searchProduct=async (query)=>{
  const response = await privateAxios.get(`/products/search/${query}`);
  return response.data;
}

//Get Products of Categories

export const getProductOfCategories=async (categoryId, pageNumber=0, pageSize=9, sortBy='addedDate', sortDir='asc')=>{
  const response = await privateAxios.get(`/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  return response.data;
}