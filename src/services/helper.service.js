export const BASE_URL_R=`http://localhost:9090`;

export const BASE_URL_A=`http://localhost:9091`;

export const PRODUCT_PAGE_SIZE = 8;

export const ADMIN_ORDER_PAGE_SIZE = 5;

export const getProductImageUrl=(productId)=>{
    return `${BASE_URL_R}/products/image/${productId}`;
}

export const getUserImageUrl=(userId)=>{
    return `${BASE_URL_R}/users/image/${userId}`;
}

export const formatDate = (time) => {
    if(!time){
        return null;
    }
    var options ={
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(time).toLocaleString("en-IN", options);
  };