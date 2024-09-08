export const BASE_URL_R=`http://localhost:9090`;

export const BASE_URL_A=`http://localhost:9091`;

export const PRODUCT_PAGE_SIZE = 8;

export const getProductImageUrl=(productId)=>{
    return `${BASE_URL_R}/products/image/${productId}`;
}