import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Home = ()=>{

    const userContext = useContext(UserContext);

    return(
        <div>
            {/* Need to solve this Problem */}
            <h1>Welcome {userContext.userData?.name}</h1>
            <h2>User is Login{userContext.isLogin ? ' True' : 'False'}</h2>
        </div>
    )
}

export default Home;