import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const { userData, isLogin } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userData);
  }, [isLogin]);

  return (
    <div>
      {/* Need to solve this Problem */}
      <h1>Welcome {user?.name}</h1>
      <h2>User is Login{isLogin ? " True" : "False"}</h2>
    </div>
  );
};

export default Home;
