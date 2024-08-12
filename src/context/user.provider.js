import { useEffect, useState } from "react";
import UserContext from "./user.context";
import {  doLogoutformLocalStorage, getTokenFromStorage, getUserFromStorage, isLoggedIn, setTokenDatainStorage, setUserDataLocalStorage } from "../auth/helper.auth";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUserData(getUserFromStorage());
    setTokenData(getTokenFromStorage());
  }, []);

  //Login
  const doLogin=(userData, tokenData)=>{
    setUserDataLocalStorage(userData);
    setTokenDatainStorage(tokenData);
    setIsLogin(true);
  };

  //Logout
  const doLogout=()=>{
    doLogoutformLocalStorage();
    setIsLogin(false);
    setUserData(null);
    setTokenData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        //U can remove this
        setUserData: setUserData,
        tokenData: tokenData,
        //U can remove this
        setTokenData: setTokenData,
        isLogin: isLogin,
        //U can remove this
        setIsLogin: setIsLogin,
        login:doLogin,
        logout:doLogout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
