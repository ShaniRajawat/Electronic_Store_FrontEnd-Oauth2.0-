export const setTokenDatainStorage=(tokenData)=>{
    localStorage.setItem("tokenData", JSON.stringify(tokenData));
};

//data: fetch
export const getUserFromStorage=()=>{
    const data = localStorage.getItem("userData");
    if(data != null){
        return JSON.parse(data);
    }else{
        return null;
    }
};

export const getTokenFromStorage=()=>{
    const data = localStorage.getItem("tokenData");
    if(data != null){
        return JSON.parse(data);
    }else{
        return null;
    }
}

//is Login
export const isLoggedIn=()=>{
    if(getTokenFromStorage()){
        return true;
    }else{
        return false;
    }
};

export const isAdminUser=()=>{
    if(isLoggedIn()){
        const user = getUserFromStorage();
        const roles = user.roles;

        if(roles.find((role)=>role.roleId==='1')){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
};

export const getToken=()=>{
    return getTokenFromStorage()?.access_token;
};

//data: remove
export const doLogoutformLocalStorage=()=>{
    localStorage.removeItem("userData");
    localStorage.removeItem("tokenData");
};