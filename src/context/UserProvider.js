import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { isAdminUser as AdminUser,  doLogoutformLocalStorage, getTokenFromStorage, getUserFromStorage, isLoggedIn, setTokenDatainStorage, setUserDataLocalStorage } from "../auth/HelperAuth";

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    setIsLogin(isLoggedIn());
    setUserData(getUserFromStorage());
    setTokenData(getTokenFromStorage());
    setIsAdminUser(AdminUser());
  }, []);

  //Login
  const doLogin=(userData, tokenData)=>{
    setUserDataLocalStorage(userData);
    setTokenDatainStorage(tokenData);
    setIsLogin(true);
    setIsAdminUser(AdminUser())
  };

  //Logout
  const doLogout=()=>{
    doLogoutformLocalStorage();
    setIsLogin(false);
    setUserData(null);
    setTokenData(null);
    setIsAdminUser(AdminUser());
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
        isAdminUser: isAdminUser,
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