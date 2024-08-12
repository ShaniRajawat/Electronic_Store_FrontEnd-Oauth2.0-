import { useContext } from "react";
import UserContext from "../../context/user.context";

const Home = ()=>{

    const userContext = useContext(UserContext);

    return(
        <div>
            <h1>Welcome {userContext.userData?.name}</h1>
            <h2>User is Login{userContext.isLogin + ''}</h2>
        </div>
    )
}

export default Home;